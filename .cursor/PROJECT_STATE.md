# VisionOS Project State

## Current Phase: Phase 1 — Monorepo & Event Architecture Design Setup

### Frozen Architecture Decisions
- **Packages Layout**: `packages/contracts`, `packages/config`, `packages/sdk`, `packages/ui` (No generic `packages/shared`).
- **Protocols**: REST API + MQTT (gRPC postponed post-MVP).
- **Workspace Standard**: `pnpm Workspaces` (`pnpm@9.15.4`), TypeScript Strict Mode (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`), ESLint Flat Config (`eslint.config.mjs`).
- **Container Infrastructure**: Separated Docker Compose files (`local`, `edge`, `production`), dedicated networks (`backend`, `database`, `edge`, `monitoring`), named persistent volumes (`postgres-data`, `redis-data`, `mosquitto-data`, `frigate-media`, `frigate-config`), structured `logs/` directories, and health checks on all containers.
- **Domain Model**: 14 core entities documented in `docs/domain/` with business descriptions, responsibilities, properties, relationships, extensibility, ownership tree, and Mermaid ERD.
- **API Standards**: Contract-First REST API specification under `/api/v1/`, standardized error envelope, pagination, filtering, date range querying, RBAC permissions, and OpenAPI organization strategy.
- **Event Architecture**: Hierarchical MQTT topic tree (`vision/{tenantId}/{edgeId}/...`), standardized event naming (`vision.camera.*`, `vision.alert.*`), envelope wrappers (`eventId`, `eventType`, `eventVersion`, `correlationId`, `requestId`), QoS strategy (QoS 0/1/2), retained message rules, exponential backoff retries with jitter, Dead-Letter Queue (DLQ), and mTLS topic ACL security.

### Completed Milestones
- [x] Initial monorepo directory layout created on `E:\VisionOS`.
- [x] Core microservices, applications, packages, infrastructure, and documentation folders established.
- [x] Technical Evaluation completed: Frigate NVR selected as Edge Vision Engine (`docs/research-sprint/catalog.md`).
- [x] Official System Architecture & Design Specification authored (`docs/architecture/system-design.md`).
- [x] Production `.gitignore` and `LICENSE` created.
- [x] **TASK-0004 Completed**: Workspace initialized & upgraded (`package.json` with pnpm@9.15.4, `pnpm-workspace.yaml`, `tsconfig.base.json` with strict indexing rules, `eslint.config.mjs` flat config, `.prettierrc`, `.editorconfig`).
- [x] **TASK-0005 Completed**: Development Environment Initialized (Docker Compose profiles `local`, `edge`, `production`, `.env` suite, Mosquitto config, Frigate config template, networks, named volumes, logging directories, container health checks).
- [x] **TASK-0006 Completed**: Architecture Decision Records created under `docs/adr/` (ADR-001 through ADR-005).
- [x] **TASK-0007 Completed**: Official Business Domain Model Specification and Mermaid ER Diagram created under `docs/domain/`.
- [x] **TASK-0008 Completed**: Official REST API Specifications authored across 23 contract documents under `docs/api/`.
- [x] **TASK-0009 Completed**: Official Event-Driven Architecture authored across 11 specification documents under `docs/events/`.

### Active Milestones
- [ ] Define shared TypeScript interfaces in `packages/contracts` and `packages/config`.
- [ ] Define OpenAPI schemas in `docs/api/openapi`.

### Architectural Notes
- Edge vision processing decoupled from cloud microservices via MQTT event bus (`frigate/events`).
- Local dev environment managed via containerized Docker Compose stacks in `infra/docker`.
