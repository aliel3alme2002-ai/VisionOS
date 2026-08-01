# Database Indexes

## Indexing Strategy

To maintain query performance, especially with high data volumes, VisionOS implements a targeted indexing strategy.

### 1. Primary Keys
Automatically indexed by PostgreSQL (B-Tree). UUIDs are used for all Primary Keys to support distributed generation and avoid sequence bottlenecks.

### 2. Foreign Keys
**Requirement:** Every Foreign Key must have a corresponding index to optimize JOIN operations and cascade checks.
*Example:*
- `CREATE INDEX idx_cameras_zone_id ON cameras("zoneId");`

### 3. Multi-Tenancy (tenantId)
**Requirement:** The `tenantId` field is queried in almost every operational request. It must be indexed on every table where it exists.
Often, compound indexes involving `tenantId` are preferred.
*Example:*
- `CREATE INDEX idx_users_tenant_email ON users("tenantId", email);`

### 4. Soft Delete (`deletedAt`)
**Requirement:** Since soft-deleted records are filtered out of most queries, queries filtering by `deletedAt IS NULL` benefit from partial indexes.
*Example:*
- `CREATE INDEX idx_active_cameras ON cameras("tenantId", "status") WHERE "deletedAt" IS NULL;`

### 5. Time-Series Data (`timestamp`)
Tables like `events` and `alerts` are queried by time ranges.
**Requirement:** Create BRIN (Block Range INdex) or B-Tree indexes on timestamp columns for large append-only tables.
*Example:*
- `CREATE INDEX idx_events_timestamp ON events USING BRIN("timestamp");`

### 6. JSONB Fields
For unstructured payloads (e.g., in `events`), use GIN indexes if specific keys are queried frequently.
*Example:*
- `CREATE INDEX idx_events_payload ON events USING GIN (payload jsonb_path_ops);`
