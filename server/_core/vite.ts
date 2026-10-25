import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    console.error(`[Server Error] Build directory not found: ${distPath}`);
  } else {
    console.log(`[Server] Serving static files from: ${distPath}`);
  }

  // 1. Servir los archivos estáticos compilados (/assets conserva caché por 1 día)
  app.use(express.static(distPath, { maxAge: "1d" }));

  // 2. Archivos dentro de /assets que no existan devuelven 404 estricto sin caer en el fallback HTML
  app.use("/assets/*", (_req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.status(404).send("Asset Not Found");
  });

  // 3. Fallback SPA únicamente para peticiones HTML válidas (¡NO-CACHE PARA INDEX.HTML!)
  app.use("*", (req, res, next) => {
    if (req.method === "GET" || req.method === "HEAD") {
      const indexPath = path.resolve(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        // PREVIENE QUE EL HTML PRINCIPAL SE RETENGA 24 HORAS EN EL ORIGEN / PERÍMETRO
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        return res.sendFile(indexPath);
      }
    }
    next();
  });
}
