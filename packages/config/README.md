# @visionos/config

## Purpose
The `@visionos/config` package is the single source of truth for runtime configuration across the entire VisionOS platform. It provides a framework-agnostic, immutable, and strictly validated configuration layer.

## Folder Structure
- `src/constants`: Application-wide immutable constants (e.g., API versions, MQTT topics).
- `src/env`: Environment variable schema definition (`zod`), loading (`dotenv`), and strict validation.
- `src/feature-flags`: Typed, immutable feature toggles.
- `src/config`: Domain-specific configuration builders (App, DB, MQTT, Storage, Auth).
- `src/types`: TypeScript interfaces for the configuration shape.

## Usage
Import the `loadConfig` function to initialize and retrieve the configuration. This function loads `.env`, validates the environment, and returns a deeply frozen configuration object.

```typescript
import { loadConfig } from '@visionos/config';

const config = loadConfig();

console.log(config.app.port);
console.log(config.features.enableEdge);
```

## Validation
Environment variables are strictly validated at startup using Zod. If any required variables are missing or incorrectly formatted (e.g., invalid URLs or missing S3 credentials when `STORAGE_PROVIDER=s3`), the application will fail fast and throw a descriptive error, preventing invalid states.

## Feature Flags
Feature flags are strongly typed booleans derived from environment variables. They are exported as part of the immutable configuration object to control features like Edge processing, Analytics, and Audit logging.

## Environment Variables
- `NODE_ENV`: 'development' | 'production' | 'test'
- `APP_NAME`: Application Name (default: 'VisionOS')
- `APP_PORT`: Application Port (default: 3000)
- `DATABASE_URL`: PostgreSQL connection string
- `MQTT_URL`: MQTT Broker URL
- `JWT_SECRET`: Secret key for JWT signing (min 16 chars)
- `JWT_EXPIRES_IN`: JWT expiration time (default: '1h')
- `STORAGE_PROVIDER`: 'local' | 's3' (default: 'local')
- `S3_ENDPOINT`: Required if STORAGE_PROVIDER is 's3'
- `S3_BUCKET`: Required if STORAGE_PROVIDER is 's3'
- `S3_ACCESS_KEY`: Required if STORAGE_PROVIDER is 's3'
- `S3_SECRET_KEY`: Required if STORAGE_PROVIDER is 's3'
- `LOG_LEVEL`: 'debug' | 'info' | 'warn' | 'error' (default: 'info')
- `ENABLE_EDGE`: boolean (default: true)
- `ENABLE_NOTIFICATIONS`: boolean (default: true)
- `ENABLE_ANALYTICS`: boolean (default: false)
- `ENABLE_AUDIT`: boolean (default: true)
- `ENABLE_OBJECT_DETECTION`: boolean (default: true)
