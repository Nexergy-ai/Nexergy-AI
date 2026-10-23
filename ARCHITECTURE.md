He consolidado todas las fuentes del proyecto, flujos de datos e interacciones de componentes para dejar un documento de arquitectura riguroso, preciso y completo.

A continuación, tienes el archivo **`ARCHITECTURE.md`** completamente actualizado para compartir con cualquier otro programador.

---

# `ARCHITECTURE.md` — Documentación Técnica de Arquitectura e Interacción de Componentes

> **Proyecto:** Nexergy AI Platform
> 
> 
> **Dominio Oficial:** [https://www.nexergy.ar](https://www.nexergy.ar)
> **Repositorio GitHub:** `Nexergy-ai/Nexergy-AI` (Rama `main`)
> 
> 
> **Última Actualización:** Octubre 2026

---

## 1. Visión General de la Arquitectura

Nexergy AI es una plataforma de inteligencia operacional e ingeniería para la transición energética, la valorización de biomasa y la movilidad eléctrica. La aplicación utiliza una arquitectura desacoplada full-stack basada en Node.js, Express, React, TypeScript y tRPC, integrando la infraestructura Serverless de Cloudflare (D1 Database y R2 Storage) para un rendimiento óptimo.

### Stack Tecnológico Principal

* **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide React, Framer Motion, Streamdown, TanStack Query.


* **Enrutamiento & Cliente API:** Wouter, tRPC Client (`@trpc/client`), React Query.


* **Backend & API Layer:** Node.js (v24+), Express 4, tRPC Server (`@trpc/server`) con serialización vía `superjson`.


* **Base de Datos & Almacenamiento Edge:**
* **Cloudflare D1:** Base de datos SQLite distribuida en Edge para metadatos de ingesta y dominios corporativos.


* **Cloudflare R2:** Almacenamiento de objetos compatible con AWS S3 para archivos técnicos, facturas y datos operativos.


* **Drizzle ORM:** Para esquemas de base de datos relacional interna en MySQL/TiDB (`drizzle/schema.ts`).




* **Infraestructura de Despliegue:** VPS Ubuntu en Hostinger, Docker / Docker Compose, Nginx (Proxy Inverso/SSL), Cloudflare CDN / Tunnel.



---

## 2. Diagrama e Interacción Completa de Componentes

El siguiente diagrama detalla la interacción entre la interfaz de usuario, las mutaciones tRPC y las APIs de Cloudflare:

```
+---------------------------------------------------------------------------------------+
|                                    Navegador (Client)                                 |
|                                                                                       |
|  [ Navigation.tsx ] -----> [ ManusDialog.tsx ] ----+                                  |
|                                                     |                                 |
|  [ Home.tsx ] ------------> [ OperationalInput.tsx ] +---> Mutaciones tRPC            |
+-------------------------------------------------------------------|-------------------+
                                                                    |
                                                      HTTP POST /api/trpc
                                                                    |
                                                                    v
+---------------------------------------------------------------------------------------+
|                                  Servidor Express / tRPC                              |
|                                    (server/routers.ts)                                |
|                                                                                       |
|  +---------------------------+               +-------------------------------------+  |
|  |   ai.createIngestion      |               |          ai.getUploadUrl            |  |
|  +-------------|-------------+               +------------------|------------------+  |
+----------------|------------------------------------------------|---------------------+
                 |                                                |
                 | REST API Cloudflare                            | AWS S3 Presigned PUT
                 v                                                v
+------------------------------------+          +---------------------------------------+
|    Cloudflare D1 Database          |          |     Cloudflare R2 Storage             |
|    (nexergy-db)                    |          |     (nexergy-plant-data)              |
|    INSERT INTO ingestions...       |          |     Almacenamiento directo PUT      |
+------------------------------------+          +---------------------------------------+

```

---

## 3. Detalle de Componentes Frontend (`client/src/`)

### A. `client/src/pages/Home.tsx`

* **Función:** Landing Page interactiva y punto de entrada a la plataforma.


* **Interacciones:**
* Renderiza `<Navigation/>` con el encabezado global y acceso a onboarding.


* Muestra las 4 Unidades de Negocio (Nexergy Flex, Nexergy Agro, Nexergy EV Charge, Nexergy Systems).


* Contiene la sección `#contacto` / `#data-ingestion` que aloja a `<OperationalInput/>`.





### B. `client/src/components/OperationalInput.tsx`

* **Función:** Formulario principal para la ingesta de datos operativos y archivos técnicos.


* **Estados Internos:**
* `sourceName`: Nombre de la instalación o dominio corporativo (ej: `arcor.com.ar` / `Planta Central`).
* `file`: Archivo adjunto técnico (PDF, XLSX, CSV, DOCX).
* `isUploading` / `uploadStatus`: Control de progreso visual durante las subidas a R2.


* **Flujo de Ejecución:**
1. Si hay un archivo adjunto, ejecuta `getUploadUrlMutation` (`ai.getUploadUrl`) para obtener la Presigned URL de Cloudflare R2.


2. Realiza un `fetch` directo con método `PUT` hacia R2 con el archivo.


3. Llama a `createIngestionMutation` (`ai.createIngestion`) registrando la ingesta en Cloudflare D1.


4. Llama a `analyzeMutation` (`ai.analyzeLLM`) para generar un diagnóstico operativo inicial.





### C. `client/src/components/ManusDialog.tsx`

* **Función:** Modal de Onboarding Corporativo activado desde el botón **"JOIN / ONBOARDING"**.


* **Comportamiento:**
* Extrae dinámicamente el nombre de la organización a partir del dominio ingresado (`getCompanyName`).
* Ejecuta `ai.createIngestion` para registrar el dominio e integrar roles corporativos en Cloudflare D1 sin abrir clientes de correo externos (`mailto:`).





### D. `client/src/components/Navigation.tsx`

* **Función:** Barra de navegación superior fija (`sticky/fixed`).
* **Interacción:** Mantiene el estado `isDialogOpen` y controla el montaje del modal `<ManusDialog/>`.

---

## 4. Estructura y Endpoints Backend (`server/routers.ts`)

El backend expone los procedimientos tRPC agrupados bajo el router `ai` en `server/routers.ts`:

### 1. `ai.createIngestion`

* **Tipo:** `mutation`
* **Input Schema:** `z.object({ sourceName: z.string() })`
* **Comportamiento:**
* Realiza una llamada HTTP `POST` a la API REST de Cloudflare D1: `[https://api.cloudflare.com/client/v4/accounts/$](https://api.cloudflare.com/client/v4/accounts/$){accountId}/d1/database/${databaseId}/query`.


* Ejecuta la consulta SQL: `INSERT INTO ingestions (source_name) VALUES (?)`.




* **Retorno:** `{ success: boolean, result: any }`.



### 2. `ai.getUploadUrl`

* **Tipo:** `mutation`
* **Input Schema:** `z.object({ fileName: z.string(), fileType: z.string() })`
* **Comportamiento:**
* Utiliza un cliente `@aws-sdk/client-s3` configurado hacia la API de Cloudflare R2 (`https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`).


* Genera una clave única: `facturas/${Date.now()}-${fileName}`.


* Firma una URL con validez de 3600 segundos mediante `getSignedUrl` (`PutObjectCommand`).




* **Retorno:** `{ uploadUrl: string, fileKey: string }`.



### 3. `ai.analyzeLLM`

* **Tipo:** `mutation`
* **Input Schema:** `z.object({ prompt: z.string() })`
* **Comportamiento:** Invoca al helper de LLM interno (`invokeLLM`) enviando un prompt especializado en inteligencia operativa industrial.


* **Retorno:** `{ content: string }`.



---

## 5. Mantenimiento y Protocolo de Despliegue en VPS (Hostinger)

Para actualizar el entorno en producción desde GitHub asegurando que Docker y Nginx tomen la nueva versión sin problemas de caché o procesos viejos en memoria:

```bash
# 1. Ingresar al directorio del repositorio en /var/www/
cd /var/www/Nexergy-AI

# 2. Descargar últimos cambios de GitHub y limpiar el árbol local
git fetch origin main
git reset --hard origin/main
git clean -fd

# 3. Sincronizar archivos hacia el espacio de trabajo de Docker
rsync -av --exclude='.env' --exclude='node_modules' --exclude='.git' /var/www/Nexergy-AI/ /opt/nexergy/

# 4. Limpiar compilaciones previas
rm -rf /opt/nexergy/dist /opt/nexergy/client/dist

# 5. Reconstruir el contenedor Docker sin capas de caché
cd /opt/nexergy
docker builder prune -f
docker compose build --no-cache app
docker compose up -d --force-recreate --no-deps app

```

### Limpieza de Caché Edge (Cloudflare CDN)

Si los estáticos de la web no reflejan los últimos cambios inmediatamente en el navegador:

1. Entrar al panel de Cloudflare (`dash.cloudflare.com`).
2. Ir a **nexergy.ar** $\rightarrow$ **Caching / Almacenamiento en caché** $\rightarrow$ **Configuration**.
3. Hacer clic en **Purge Everything / Purgar todo**.

---

## 6. Guía y Normas Técnicas para Desarrolladores

1. **Sin enlaces `mailto:` para capturar usuarios:** Todo flujo de onboarding o de contacto debe realizarse consumiendo las mutaciones de tRPC hacia Cloudflare D1/R2 para garantizar la trazabilidad analítica.


2. **Serialización e Inmutabilidad de Tipos:** tRPC utiliza `superjson`. Puedes retornar objetos `Date` nativos desde el backend sin necesidad de formatear manualmente a ISO Strings.


3. **Manejo de Variables de Entorno:**
* Las credenciales de Cloudflare (`CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_DATABASE_ID`, `CLOUDFLARE_D1_TOKEN`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`) deben residir en el archivo `.env` del servidor en `/opt/nexergy/.env` y nunca subirse a GitHub.
