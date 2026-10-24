import express, { type Express } from "express";
import fs from "node:fs";
import path from "node:path";

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

  // 2. Interceptar assets inexistentes dentro de /assets (devolviendo 404 estricto)
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
