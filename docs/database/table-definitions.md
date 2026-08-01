# Table Definitions

*Note: All tables implicitly include standard [Audit Fields](./audit-fields.md).*

## `tenants`
Stores organizational accounts.
- `id` (UUID, PK)
- `name` (VARCHAR)
- `status` (ENUM: ACTIVE, SUSPENDED)

## `users`
Stores user credentials and profiles.
- `id` (UUID, PK)
- `tenantId` (UUID, FK)
- `email` (VARCHAR, UNIQUE)
- `passwordHash` (VARCHAR)
- `role` (ENUM: ADMIN, MANAGER, VIEWER)

## `sites`
Geographical locations managed by a tenant.
- `id` (UUID, PK)
- `tenantId` (UUID, FK)
- `name` (VARCHAR)
- `timezone` (VARCHAR)

## `buildings`
Physical structures within a site.
- `id` (UUID, PK)
- `siteId` (UUID, FK)
- `tenantId` (UUID, FK)
- `name` (VARCHAR)

## `floors`
Levels within a building.
- `id` (UUID, PK)
- `buildingId` (UUID, FK)
- `tenantId` (UUID, FK)
- `name` (VARCHAR)
- `level` (INTEGER)

## `zones`
Logical groupings within a floor or site.
- `id` (UUID, PK)
- `floorId` (UUID, FK, Nullable)
- `siteId` (UUID, FK, Nullable)
- `tenantId` (UUID, FK)
- `name` (VARCHAR)

## `edge_boxes`
Local compute nodes at a site.
- `id` (UUID, PK)
- `siteId` (UUID, FK)
- `tenantId` (UUID, FK)
- `macAddress` (VARCHAR, UNIQUE)
- `status` (ENUM: ONLINE, OFFLINE)

## `cameras`
Video capture devices.
- `id` (UUID, PK)
- `zoneId` (UUID, FK)
- `edgeBoxId` (UUID, FK)
- `tenantId` (UUID, FK)
- `streamUrl` (VARCHAR)
- `status` (ENUM)

## `devices`
IoT or integrated hardware devices.
- `id` (UUID, PK)
- `zoneId` (UUID, FK)
- `tenantId` (UUID, FK)
- `type` (VARCHAR)

## `events`
Raw occurrences emitted by edge devices.
- `id` (UUID, PK)
- `tenantId` (UUID, FK)
- `sourceId` (UUID, Polymorphic: camera, device, edge_box)
- `type` (VARCHAR)
- `payload` (JSONB)
- `timestamp` (TIMESTAMPTZ)

## `rules`
Logic definitions for evaluating events.
- `id` (UUID, PK)
- `tenantId` (UUID, FK)
- `name` (VARCHAR)
- `conditions` (JSONB)
- `actions` (JSONB)
- `status` (BOOLEAN)

## `alerts`
Actionable occurrences resulting from rule evaluation.
- `id` (UUID, PK)
- `tenantId` (UUID, FK)
- `ruleId` (UUID, FK)
- `eventId` (UUID, FK)
- `status` (ENUM: NEW, ACKNOWLEDGED, RESOLVED)

## `notifications`
Messages dispatched to users based on alerts.
- `id` (UUID, PK)
- `tenantId` (UUID, FK)
- `userId` (UUID, FK)
- `alertId` (UUID, FK)
- `channel` (ENUM: EMAIL, SMS, PUSH)
- `status` (ENUM: PENDING, SENT, FAILED)

## `licenses`
Entitlements for tenants.
- `id` (UUID, PK)
- `tenantId` (UUID, FK)
- `tier` (VARCHAR)
- `validUntil` (TIMESTAMPTZ)
