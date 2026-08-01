# Multi-Tenancy Strategy

## Architecture: Logical Separation

VisionOS uses a **Logical Separation** (Row-Level Multi-Tenancy) model. All tenants share the same physical database and schemas. Isolation is enforced through a mandatory `tenantId` column on every operational table.

## Implementation Details

### Database Schema
Every table (excluding global dictionary tables, if any) MUST contain a `tenantId` column:
- `tenantId` (UUID, NOT NULL, Foreign Key to `tenants.id`)

### Application Layer Enforcement
To prevent accidental data leaks across tenants, isolation must be enforced automatically by the application architecture, not left to individual developers' memory.

**Prisma Client Extensions:**
We utilize Prisma Client Extensions to globally inject the `tenantId` into every query based on the current Request Context.
- `findMany`, `findFirst`, `update`, `delete` operations automatically receive `where: { tenantId: currentTenantId }`.
- `create` operations automatically receive `data: { tenantId: currentTenantId }`.

### Database Layer Enforcement (Defense in Depth)
While the application layer handles standard filtering, we implement PostgreSQL **Row Level Security (RLS)** as a safety net.
- RLS policies restrict row access based on a session variable (e.g., `current_tenant_id`).
- *Note: RLS is primarily a defense-in-depth mechanism. The application must still perform its own filtering for performance and explicit logic flow.*

### Indexes
See [Indexes](./indexes.md). `tenantId` is consistently included in indexes to optimize the mandatory filtering.
