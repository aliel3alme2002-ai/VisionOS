# Migration Strategy

## Overview

Database migrations in VisionOS are managed strictly through Prisma Migrate. This ensures a consistent, version-controlled evolution of the database schema across all environments (local, edge, production).

## Workflow

### 1. Local Development
1. Modify `schema.prisma`.
2. Run `pnpm prisma migrate dev --name <descriptive_name>`.
3. Prisma generates a new SQL file in `prisma/migrations/`.
4. Review the generated `migration.sql`. Modify it if custom database features (like partitions or complex views) are required.
5. Commit the migration file and `schema.prisma` to version control.

### 2. Edge Deployments (Edge Boxes)
Edge boxes operate with limited connectivity and compute.
- Migrations are applied automatically on application startup.
- The startup script runs `pnpm prisma migrate deploy`.
- Migrations must be strictly backward compatible to avoid bricking edge nodes during partial rollouts.

### 3. Production Deployment (Cloud)
- Migrations are applied during the CI/CD pipeline, prior to deploying the new application code.
- Command: `pnpm prisma migrate deploy`.
- **Zero-Downtime Requirement:** All migrations must be designed for zero downtime.
  - Do not drop columns directly. (Phase 1: Ignore in app, Phase 2: Drop).
  - Create indexes concurrently. Note: Prisma's default migration engine blocks when creating indexes. For large tables, manual SQL modifications using `CREATE INDEX CONCURRENTLY` in the migration file are mandatory.

## Data Migrations
For moving or transforming existing data:
1. Create an empty migration: `pnpm prisma migrate dev --create-only`.
2. Write raw SQL `UPDATE` or `INSERT` statements inside the generated file.
3. Ensure operations are batched if affecting millions of rows to prevent locking tables for extended periods.
