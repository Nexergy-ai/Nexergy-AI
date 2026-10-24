import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Asegurar la ruta fija de compilación dist/public dentro del directorio de trabajo de Docker (/app/dist/public)
  const distPath = path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    console.error(
      `[Server Error] Could not find the build directory: ${distPath}. Make sure 'npm run build' generates dist/public.`
    );
  } else {
    console.log(`[Server] Serving static files from: ${distPath}`);
  }

  // 1. Servir archivos estáticos reales y existentes
  app.use(express.static(distPath));

  // 2. Regla para assets inexistentes: Evitar que /assets/* devuelva index.html con HTTP 200
  app.get("/assets/*", (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.sendStatus(404);
  });

  // 3. Fallback SPA: Solo para rutas de la aplicación de React
  app.use("*", (_req, res, next) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      next();
    }
  });
}
