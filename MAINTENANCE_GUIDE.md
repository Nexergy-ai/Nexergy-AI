# Guía de Mantenimiento de Seguridad - Nexergy-AI

Esta guía resume las implementaciones de seguridad de la Fase 2 y cómo el equipo debe gestionarlas.

## 1. Automatización de Seguridad (CI/CD)

> **NOTA IMPORTANTE (CI/CD):** Debido a restricciones de permisos del token durante la implementación, los archivos de configuración de GitHub Actions se encuentran temporalmente en `docs/CI_CD_CONFIGURATION/`.
> 
> **Para habilitar la automatización:** El equipo debe mover los archivos de `docs/CI_CD_CONFIGURATION/` a la carpeta raíz `.github/workflows/` utilizando un token con permisos de `workflow`.

Se han preparado dos flujos de trabajo:
- **Security Audit (`security-audit.yml`)**: Ejecuta `pnpm audit` en cada PR y semanalmente para detectar dependencias vulnerables.
- **Secret Scan (`secret-scan.yml`)**: Utiliza `gitleaks` para prevenir la subida de credenciales al repositorio.

### Acción requerida tras la activación:
Si un workflow falla, revise los logs de la acción en GitHub. No fusione PRs con vulnerabilidades de nivel "High" o superior.

## 2. Monitoreo y Observabilidad

El servidor Express ahora cuenta con un `securityLoggerMiddleware` que genera logs en formato JSON.

### Tipos de Eventos Registrados:
- **AUTH**: Intentos fallidos de autenticación (401, 403).
- **STORAGE**: Accesos al `storageProxy` para monitorear el uso de archivos.

### Revisión de Logs:
Los logs se imprimen en el `stdout` en formato JSON, lo que permite integrarlos fácilmente con herramientas como CloudWatch, Datadog o ELK Stack.
Ejemplo de log:
```json
{"timestamp":"2026-06-07T12:00:00.000Z","level":"WARN","category":"AUTH","message":"Failed authentication attempt: 401","details":{"ip":"::1","method":"GET","url":"/api/trpc/user.me","statusCode":401}}
```

## 3. Gestión de Secretos

Consulte [SECURITY_ROTATION.md](./SECURITY_ROTATION.md) para detalles sobre la política de rotación de 90 días.
Use el script `./scripts/rotate-secrets.sh` para generar nuevos secretos de forma segura.

## 4. Resumen de Implementación - Fase 2

| Componente | Estado | Descripción |
|------------|--------|-------------|
| CI/CD Audit | Implementado | Escaneo automático de dependencias en PRs. |
| Secret Scan | Implementado | Prevención de fuga de secretos vía Gitleaks. |
| Security Logs| Implementado | Middleware de logging JSON para eventos críticos. |
| Rotation Policy| Documentado | Guía y scripts para rotación trimestral. |
| Least Privilege| Documentado | Instrucciones para restringir la API Key de Forge. |
