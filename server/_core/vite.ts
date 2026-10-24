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

  // 1. Servir archivos estáticos que SÍ existen en /dist/public
  app.use(express.static(distPath));

  // 2. Interceptar activos estáticos inexistentes (/assets/*) para evitar el fallback SPA
  app.get("/assets/*", (_req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.status(404).send("Asset not found");
  });

  // 3. Fallback SPA únicamente para las rutas de la aplicación React
  app.use("*", (_req, res, next) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      next();
    }
  });
}
