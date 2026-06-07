# Política de Rotación de Secretos y Menor Privilegio

Este documento detalla los procedimientos para la gestión de secretos y la aplicación del principio de menor privilegio en Nexergy-AI.

## 1. Rotación de Secretos (Política de 90 días)

Todos los secretos críticos deben rotarse cada 90 días para minimizar el impacto de una posible filtración.

### Secretos a Rotar:
- `JWT_SECRET`: Utilizado para la firma de tokens de sesión.
- `BUILT_IN_FORGE_API_KEY`: Utilizado para el acceso al storage proxy.
- `DATABASE_URL`: Credenciales de acceso a la base de datos.

### Procedimiento de Rotación:
1. Generar un nuevo secreto (ver script `scripts/rotate-secrets.sh`).
2. Actualizar el secreto en el panel de control del entorno (Vercel, GitHub Secrets, etc.).
3. Realizar un despliegue controlado.
4. (Opcional) Invalidar el secreto anterior si el proveedor lo permite.

## 2. Principio de Menor Privilegio: BUILT_IN_FORGE_API_KEY

La clave `BUILT_IN_FORGE_API_KEY` se utiliza para interactuar con el backend de almacenamiento (Forge). 

### Restricción de Alcance:
Para cumplir con el principio de menor privilegio, esta API Key debe estar restringida en el panel de control del proveedor:
- **Scope**: Limitar únicamente a operaciones `s3:GetObject` y `s3:PutObject` (si es necesario).
- **Resources**: Restringir el acceso únicamente a los buckets específicos utilizados por la aplicación Nexergy-AI.
- **IP Whitelisting**: Si el servidor tiene una IP estática, restringir el uso de la API Key a esa dirección IP.

### Auditoría:
Se recomienda revisar trimestralmente los logs de uso de la API Key para asegurar que no se están realizando llamadas no autorizadas o desde orígenes desconocidos.
