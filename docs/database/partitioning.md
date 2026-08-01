# Partitioning Strategy

## Overview

VisionOS generates high volumes of time-series data, specifically:
- `events`
- `alerts`
- (Future) `telemetry`, `heartbeats`

To maintain query performance, facilitate efficient data archival, and minimize index bloat, these tables utilize PostgreSQL declarative partitioning.

## Partitioning Scheme: Range Partitioning (By Time)

High-volume tables are partitioned by time intervals.

### Partition Key
- `timestamp` (TIMESTAMPTZ) OR `createdAt` (TIMESTAMPTZ) depending on the table semantics.

### Interval
- Initial strategy: **Monthly** partitions.
- *Example:* `events_y2026m01`, `events_y2026m02`.
- If volume for a single tenant exceeds 10M rows/month, we may evaluate Weekly or Daily partitioning, or introduce composite partitioning (by `tenantId` then `timestamp`).

## Implementation

1. **Table Creation:**
   - Create the parent table with `PARTITION BY RANGE ("timestamp")`.
2. **Partition Management:**
   - Use `pg_partman` or custom background workers (Node.js cron jobs) to automatically pre-create future partitions.
3. **Data Retention (Pruning):**
   - Dropping old data is achieved by simply `DROP TABLE events_y2024m01;`. This is instantaneous and reclaims space immediately, unlike massive `DELETE` statements.

## Prisma Limitations & Workarounds
Prisma has limited native support for defining partitions.
- Partitions must be managed via Raw SQL in Prisma migrations (`migration.sql`).
- The parent table is defined in `schema.prisma` for type generation and querying. Prisma correctly routes queries to the underlying partitions.
