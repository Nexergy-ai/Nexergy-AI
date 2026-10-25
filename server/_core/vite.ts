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
  const assetsPath = path.resolve(distPath, "assets");

  if (!fs.existsSync(distPath)) {
    console.error(`[Server Error] Build directory not found: ${distPath}`);
  } else {
    console.log(`[Server] Serving static files from: ${distPath}`);
  }

  // 1. Montar el subdirectorio de assets estáticos reales con caché persistente
  app.use(
    "/assets",
    express.static(assetsPath, {
      fallthrough: true,
      maxAge: "1y",
      immutable: true,
    })
  );

  // 2. Interceptar assets inexistentes dentro de /assets (devolviendo 404 estricto sin caer en SPA)
  app.use("/assets", (_req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.status(404).send("Asset not found");
  });

  // 3. Servir archivos estáticos del directorio raíz (/favicon.ico, /robots.txt, etc.)
  app.use(express.static(distPath));

  // 4. Fallback SPA condicional estricto (no intercepta /api, /assets ni peticiones non-HTML)
  app.use((req, res, next) => {
    const isGetOrHead = req.method === "GET" || req.method === "HEAD";
    const isApiOrAsset = req.path.startsWith("/api") || req.path.startsWith("/assets");
    const acceptsHtml = req.accepts("html");

    if (isGetOrHead && !isApiOrAsset && acceptsHtml) {
      const indexPath = path.resolve(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath);
      }
    }
    next();
  });
}
