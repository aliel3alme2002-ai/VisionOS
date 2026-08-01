# Soft Delete Strategy

## Purpose
To prevent accidental data loss and support recovery/audit scenarios, VisionOS employs a soft-delete strategy for all core business entities. Hard deletion (physical `DELETE` from the database) is reserved for regulatory compliance (e.g., GDPR Right to be Forgotten) or automated archival processes.

## Implementation

### Standard Audit Fields
Tables utilizing soft-delete must include:
- `deletedAt` (TIMESTAMPTZ, Nullable)
- `deletedBy` (UUID, Nullable)

### Querying
When querying data, records where `deletedAt IS NOT NULL` must be explicitly excluded.

**Prisma Implementation:**
This is typically handled using Prisma Client Extensions to automatically append `where: { deletedAt: null }` to all relevant queries.

### Cascading Soft Deletes
Soft-deleting a parent entity (e.g., a `Site`) must cascade to child entities (e.g., `Buildings`, `Cameras`) either through:
1. Application logic (emitting a domain event that triggers child deletion).
2. Database triggers.
*Current Decision:* Application logic and domain events are preferred for better control and auditability.

### Unique Constraints
Unique constraints must account for soft-deleted records.
*Example:* If a Site named "HQ" is soft-deleted, creating a new Site named "HQ" should be permitted.
*Implementation:* Use partial unique indexes.
- `CREATE UNIQUE INDEX idx_unique_site_name ON sites("tenantId", "name") WHERE "deletedAt" IS NULL;`

### Exemptions
Transient, high-volume data (like `events` or telemetry) may not use soft-delete to save space. They rely on standard retention policies and partitioning for lifecycle management.
