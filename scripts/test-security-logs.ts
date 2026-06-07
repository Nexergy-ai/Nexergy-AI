import express from "express";
import { securityLoggerMiddleware } from "../server/_core/securityLogger";

const app = express();
app.use(securityLoggerMiddleware);

// Simular un endpoint de storage
app.get("/manus-storage/test-file.txt", (req, res) => {
  res.send("Storage access simulated");
});

// Simular un fallo de autenticación
app.get("/api/secure-data", (req, res) => {
  res.status(401).send("Unauthorized access simulated");
});

console.log("--- Iniciando prueba de logs de seguridad ---");
console.log("Se esperan 2 logs JSON en la consola:");

// Mock de request y response para la prueba manual sin levantar el servidor
const mockReqStorage = { originalUrl: "/manus-storage/test-file.txt", method: "GET", ip: "127.0.0.1", get: () => "TestAgent" } as any;
const mockResStorage = { statusCode: 200, send: (b: any) => b } as any;

const mockReqAuth = { originalUrl: "/api/secure-data", method: "GET", ip: "127.0.0.1", get: () => "TestAgent" } as any;
const mockResAuth = { statusCode: 401, send: (b: any) => b } as any;

console.log("\n1. Probando acceso a Storage...");
securityLoggerMiddleware(mockReqStorage, mockResStorage, () => {});

console.log("\n2. Probando fallo de autenticación (401)...");
securityLoggerMiddleware(mockReqAuth, mockResAuth, () => {
    mockResAuth.send("Body");
});
