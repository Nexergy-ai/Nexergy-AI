import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    console.error(`[Server Error] Could not find build directory: ${distPath}`);
  } else {
    console.log(`[Server] Serving static files from: ${distPath}`);
  }

  // 1. Servir archivos estáticos reales
  app.use(express.static(distPath));

  // 2. Interceptar assets inexistentes (EVITAR HTTP 200 con index.html)
  app.get("/assets/*", (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.sendStatus(404);
  });

  // 3. Fallback SPA únicamente para navegación de React
  app.use("*", (_req, res, next) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      next();
    }
  });
}
