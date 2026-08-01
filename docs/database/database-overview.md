# Database Overview

## Target Technology

- **Database Engine:** PostgreSQL 17
- **ORM / Query Builder:** Prisma (TypeScript)
- **Deployment:** Dockerized for local/edge, managed cloud database for production.

## Core Design Principles

1.  **Multi-Tenancy:** Every operational table must enforce tenant isolation (see [Multi-Tenancy](./multi-tenancy.md)).
2.  **Auditability:** Every entity must include standardized audit fields to track its lifecycle (see [Audit Fields](./audit-fields.md)).
3.  **Data Retention & Soft Deletion:** Critical business entities are never hard-deleted; they are soft-deleted instead (see [Soft Delete](./soft-delete.md)).
4.  **Performance:** High-volume telemetry and event data utilize PostgreSQL declarative partitioning (see [Partitioning](./partitioning.md)).
5.  **Referential Integrity:** Enforce strict foreign key constraints at the database level to prevent orphaned data.
6.  **Type Safety:** Strict mapping between PostgreSQL data types and Prisma/TypeScript types.
