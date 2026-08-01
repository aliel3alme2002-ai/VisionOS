# @visionos/contracts

## Purpose
The `@visionos/contracts` package serves as the single source of truth for shared domain definitions across the entire VisionOS platform. It contains Data Transfer Objects (DTOs), Enums, Event Definitions, Types, Errors, and Zod validation schemas.

## Architecture Rules
- **Framework Agnostic:** Independent of framework abstractions (no NestJS, React, Fastify, etc.).
- **No Prisma:** Absolutely zero ORM dependencies or database-specific annotations.
- **No NestJS:** Free of decorators (`class-validator`, `@ApiProperty`, etc.).
- **No Database:** Pure JavaScript/TypeScript types and schemas.
- **No Business Logic:** Contains purely structural declarations and validators.
- **Single Source of Truth:** Centralizes domain definitions for the platform.
- **Shared Across Ecosystem:** Used directly by Backend services, Frontend web apps, and Edge nodes.

## Folder Structure
- `src/dto`: Immutable DTO interfaces representing the domain models for API communication.
- `src/enums`: Standardized enumerations (Status, Roles, Severities, etc.).
- `src/events`: Payload definitions for the Event-Driven Architecture (MQTT / Kafka).
- `src/errors`: Standardized API error formats and codes.
- `src/types`: Granular reusable types (e.g., branded `UUID`, `ISODateString`, `BoundingBox`, `Coordinates`, `JsonValue`).
- `src/validation`: Zod schemas for rigorous, isomorphic data validation.

## Usage

Everything is exported from the root barrel file `src/index.ts`.

### How Backend (NestJS) Imports It
The backend uses contracts to enforce typing on Controllers, Services, and event publishers. Zod schemas are used in custom pipes for request validation.

```typescript
import { CameraDto, CameraConnectedEvent, cameraSchema } from '@visionos/contracts';
```

### How Frontend (React) Imports It
The frontend utilizes these DTOs for type-safe API requests (e.g., with React Query) and Zod schemas for robust form validation (e.g., with react-hook-form).

```typescript
import { UserDto, userSchema } from '@visionos/contracts';
```

### How Edge Services Imports It
Edge nodes (e.g., Python/Node.js Frigate integrations) use these definitions to guarantee event payloads are formatted correctly before dispatching them to the Cloud.

```typescript
import { MotionDetectedEvent } from '@visionos/contracts';
```
