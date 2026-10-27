import "dotenv/config";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { securityLoggerMiddleware } from "./securityLogger";

// IP real del visitante: detrás de Cloudflare + Nginx, req.ip es la del proxy.
function clientIp(req: express.Request): string {
  const cf = req.headers["cf-connecting-ip"];
  return (Array.isArray(cf) ? cf[0] : cf) || req.ip || "unknown";
}

// Lecturas (GET): holgado. Escrituras (POST: altas, URLs de subida): más estricto.
const readLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: clientIp,
});

const writeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: clientIp,
  message: { error: "Demasiadas solicitudes. Inténtalo de nuevo en unos minutos." },
});

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Cabeceras de seguridad. CSP, COOP y HSTS quedan fuera por ahora para no romper
  // la app ni el login; HSTS se configura en Cloudflare.
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
      hsts: false,
    })
  );

  // Límite de peticiones ANTES de procesar el cuerpo de la solicitud.
  app.use("/api/trpc", (req, res, next) =>
    (req.method === "POST" ? writeLimiter : readLimiter)(req, res, next)
  );

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(securityLoggerMiddleware);

  registerStorageProxy(app);
  registerOAuthRoutes(app);

  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || "3000", 10);
  const host = "0.0.0.0";

  server.listen(port, host, () => {
    console.log(`[Server] Running in ${process.env.NODE_ENV} mode on http://${host}:${port}/`);
  });
}

startServer().catch((err) => {
  console.error("[Server] Fatal error during startup:", err);
});
