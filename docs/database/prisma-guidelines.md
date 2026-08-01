# Prisma Guidelines

## Core Principles

Prisma is our chosen ORM. Strict adherence to these guidelines ensures database integrity and application performance.

## 1. Schema Definition (`schema.prisma`)

### Formatting
- Group models logically.
- Use explicit `@map` and `@@map` to decouple database table/column names from TypeScript object properties.
  - DB: `snake_case` (e.g., `created_at`, `edge_boxes`)
  - TS: `camelCase` (e.g., `createdAt`, `EdgeBox`)
  - *Example:* `createdAt DateTime @map("created_at") @db.Timestamptz()`

### Types
- Always use `Timestamptz` for dates: `@db.Timestamptz()`.
- Use `db.Uuid` for all IDs: `id String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid`.
- Use `db.JsonB` for JSON payloads: `payload Json @db.JsonB`.

## 2. Migrations

- All database schema changes MUST go through `prisma migrate dev`.
- Never modify the database directly.
- Review the generated SQL in `migration.sql` before committing.
- For complex changes (e.g., adding partitioning, data migrations), write manual SQL inside the `migration.sql` file.

## 3. Querying

### N+1 Problem
Avoid N+1 queries. Use Prisma's `include` to fetch related data in a single query when necessary.
*Example:* `prisma.site.findMany({ include: { buildings: true } })`

### Select Specific Fields
For large tables or when returning data to the client, use `select` to fetch only required fields, saving bandwidth and memory.

### Raw Queries
Use `$queryRaw` ONLY when standard Prisma client operations are insufficient (e.g., complex aggregations, window functions, interacting with specific PostgreSQL extensions).

## 4. Client Extensions
Leverage Prisma Client Extensions for:
- Automatic `tenantId` filtering.
- Soft-delete filtering (`where: { deletedAt: null }`).
- Audit field injection (`createdBy`, `updatedBy`).
