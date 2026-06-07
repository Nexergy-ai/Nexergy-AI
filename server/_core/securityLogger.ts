import type { Request, Response, NextFunction } from "express";

export interface SecurityLog {
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR";
  category: "AUTH" | "STORAGE" | "ACCESS";
  message: string;
  details: {
    ip?: string;
    method?: string;
    url?: string;
    userAgent?: string;
    [key: string]: any;
  };
}

export function logSecurityEvent(event: SecurityLog) {
  console.log(JSON.stringify(event));
}

export function securityLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const originalSend = res.send;
  const originalRedirect = res.redirect;

  // Interceptar fallos de autenticación (401, 403)
  res.send = function (body) {
    if (res.statusCode === 401 || res.statusCode === 403) {
      logSecurityEvent({
        timestamp: new Date().toISOString(),
        level: "WARN",
        category: "AUTH",
        message: `Failed authentication attempt: ${res.statusCode}`,
        details: {
          ip: req.ip,
          method: req.method,
          url: req.originalUrl,
          userAgent: req.get("user-agent"),
          statusCode: res.statusCode,
        },
      });
    }
    return originalSend.apply(res, arguments as any);
  };

  // Monitorear accesos al storageProxy
  if (req.originalUrl.startsWith("/manus-storage/")) {
    logSecurityEvent({
      timestamp: new Date().toISOString(),
      level: "INFO",
      category: "STORAGE",
      message: `Storage access request`,
      details: {
        ip: req.ip,
        method: req.method,
        url: req.originalUrl,
        userAgent: req.get("user-agent"),
      },
    });
  }

  next();
}
