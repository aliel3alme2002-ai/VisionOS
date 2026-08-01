# Database Constraints

## Overview
Constraints enforce data integrity at the lowest level, preventing invalid data from entering the system even if application-level validations fail.

### 1. Primary Keys
- All entities use `UUID` (specifically v4) as their primary identifier.

### 2. Foreign Keys
- Enforce strict relational integrity.
- **On Delete Strategy:**
  - Standard entities: `ON DELETE RESTRICT` to prevent accidental deletion of referenced records.
  - Compositional entities (e.g., `Events` belonging to a `Camera`): `ON DELETE CASCADE` (handled carefully in conjunction with soft deletes).

### 3. Unique Constraints
- Ensure uniqueness of specific fields, often scoped by `tenantId`.
- Examples:
  - `macAddress` in `edge_boxes` must be globally unique.
  - `email` in `users` must be globally unique (or unique per tenant if B2B logic allows).
  - `name` in `sites` should be unique per `tenantId`: `UNIQUE("tenantId", "name")`.

### 4. Check Constraints
- Ensure values fall within acceptable ranges or specific conditions.
- Examples:
  - `status` fields should be constrained if ENUMs are not used.
  - Ensure hierarchical validity (e.g., a `Zone` must belong to either a `Floor` or a `Site`, but not both): `CHECK (("floorId" IS NOT NULL AND "siteId" IS NULL) OR ("floorId" IS NULL AND "siteId" IS NOT NULL))`

### 5. Not Null Constraints
- Apply strictly to all required fields. `tenantId` is `NOT NULL` for all operational tables.
- All Audit Fields (except `deletedAt` and `deletedBy`) are `NOT NULL`.
