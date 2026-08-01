# VisionOS Backend Bootstrap Documentation

## 1. Overview & Architecture
The VisionOS Backend (`@visionos/backend`) is a NestJS application built on Fastify. It acts as the core REST API server, relying strictly on `@visionos/config` for runtime settings and `@visionos/contracts` for data exchange schemas.

## 2. Folder Structure
```text
apps/backend
├── package.json
├── tsconfig.json
└── src
    ├── main.ts
    ├── app.module.ts
    ├── common
    │   ├── context
    │   │   └── request-context.ts
    │   ├── filters
    │   │   └── global-exception.filter.ts
    │   ├── logging
    │   │   └── visionos-logger.service.ts
    │   ├── middleware
    │   │   └── request-context.middleware.ts
    │   └── pipes
    │       └── zod-validation.pipe.ts
    ├── config
    │   ├── config.constants.ts
    │   ├── config.module.ts
    │   └── config.provider.ts
    ├── core
    │   ├── core.module.ts
    │   └── lifecycle.service.ts
    └── health
        ├── health.controller.ts
        └── health.module.ts
```

## 3. Startup Flow & Bootstrap Order
1. **Load Configuration**: Instantiated via `@visionos/config` during module initialization.
2. **Create Nest Application**: Using `FastifyAdapter` with `bufferLogs: true`.
3. **Register Security & Plugins**: Helmet (`@fastify/helmet`), CORS (`*`), and Compression (`@fastify/compress`).
4. **Register Logger & Global Exception Filters**: Attach `VisionOSLogger` and `GlobalExceptionFilter`.
5. **Configure Prefix & Versioning**: Global prefix `/api`, URI versioning defaulting to `v1` (`/api/v1/...`).
6. **Register Swagger**: Mounted at `/docs` in non-production environments (`config.app.env !== 'production'`).
7. **Enable Graceful Shutdown Hooks**: Register `SIGINT` and `SIGTERM` handlers.
8. **Start Server**: Listen on configured port (`3000`) and print startup banner.

## 4. Global Middleware, Pipes, and Filters
- **RequestContextMiddleware**: Injects `x-request-id`, `x-correlation-id`, and `x-trace-id` into `AsyncLocalStorage`.
- **VisionOSLogger**: Formats logs as structured JSON strings containing contextual IDs and timestamps.
- **GlobalExceptionFilter**: Catches all unhandled exceptions and formats them according to `@visionos/contracts` schema `{ success, error, requestId, timestamp }`. Stack traces are omitted in production.
- **ZodValidationPipe**: Validates incoming payload schemas using Zod without `class-validator`.

## 5. Health Endpoint & Swagger
- **Health Check**: `GET /api/v1/health`
  ```json
  {
    "status": "healthy",
    "version": "1.0.0",
    "environment": "development",
    "uptime": 123,
    "timestamp": "2026-07-31T07:42:31.373Z"
  }
  ```
- **Swagger Documentation**: Available in development mode at `/docs`. Features `v1` API versioning, Bearer Auth schema placeholder, and `Health` controller tags.
