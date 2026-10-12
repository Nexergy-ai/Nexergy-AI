export function serveStatic(app: Express) {
  // Intentar resolver la carpeta de estáticos según el entorno y rutas posibles
  const possiblePaths = [
    path.resolve(import.meta.dirname, "public"),
    path.resolve(import.meta.dirname, "../..", "dist", "public"),
    path.resolve(import.meta.dirname, "..", "dist", "public"),
    path.resolve(process.cwd(), "dist", "public"),
    path.resolve(process.cwd(), "client", "dist"),
  ];

  let distPath = possiblePaths.find((p) => fs.existsSync(p));

  if (!distPath) {
    console.error(
      `[Server Error] Could not find any valid build directory in:`,
      possiblePaths
    );
    // Asignación por defecto en caso de no encontrar ninguna
    distPath = path.resolve(import.meta.dirname, "public");
  } else {
    console.log(`[Server] Serving static files from: ${distPath}`);
  }

  app.use(express.static(distPath));

  // Fallback para SPA (Single Page Application)
  app.use("*", (_req, res, next) => {
    const indexPath = path.resolve(distPath!, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      next();
    }
  });
}
