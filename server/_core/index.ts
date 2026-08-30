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

async function startServer() {
  const app = express();
  const server = createServer(app);

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

  // Render asigna el puerto mediante la variable de entorno PORT
  const port = parseInt(process.env.PORT || "10000", 10);
  const host = "0.0.0.0";

  server.listen(port, host, () => {
    console.log(`[Server] Running in ${process.env.NODE_ENV} mode on http://${host}:${port}/`);
  });
}

startServer().catch((err) => {
  console.error("[Server] Fatal error during startup:", err);
});
