import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  const assetsPath = path.resolve(distPath, "assets");

  if (!fs.existsSync(distPath)) {
    console.error(`[Server Error] Build directory not found: ${distPath}`);
  } else {
    console.log(`[Server] Serving static files from: ${distPath}`);
  }

  // 1. Montar el subdirectorio de assets estáticos con caché agresiva para archivos existentes
  app.use(
    "/assets",
    express.static(assetsPath, {
      fallthrough: true,
      maxAge: "1y",
      immutable: true,
    })
  );

  // 2. Interceptar assets inexistentes dentro de /assets (evita caer en el fallback SPA)
  app.use("/assets", (_req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.status(404).send("Asset not found");
  });

  // 3. Servir el resto del directorio estático raíz (favicon, robots.txt, etc.)
  app.use(express.static(distPath));

  // 4. Fallback SPA únicamente para las rutas de la aplicación React (sin comodín con sintaxis frágil)
  app.use((req, res, next) => {
    // Si la petición es un método GET/HEAD y solicita HTML/documentos
    if (req.method === "GET" || req.method === "HEAD") {
      const indexPath = path.resolve(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath);
      }
    }
    next();
  });
}
