# Audit Fields

## Standard Audit Fields

Every operational table in the VisionOS database must include standard audit fields to track data lifecycle and attribution. This ensures accountability and debugging capabilities.

### Required Fields

| Column Name | Data Type | Nullable | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `createdAt` | `TIMESTAMPTZ` | No | `NOW()` | Timestamp when the record was created. |
| `updatedAt` | `TIMESTAMPTZ` | No | `NOW()` | Timestamp when the record was last modified. |
| `deletedAt` | `TIMESTAMPTZ` | Yes | `NULL` | Timestamp when the record was soft-deleted. |
| `createdBy` | `UUID` | No* | - | ID of the User or System Service that created the record. |
| `updatedBy` | `UUID` | No* | - | ID of the User or System Service that last modified the record. |
| `deletedBy` | `UUID` | Yes | `NULL` | ID of the User or System Service that soft-deleted the record. |

*\* Note: For tables populated entirely by background services where a "user" context is meaningless, a designated "System Account" UUID should be used.*

## Automated Management

- **createdAt**: Managed by database defaults.
- **updatedAt**: Managed by Prisma automatically using `@updatedAt`.
- **createdBy / updatedBy / deletedBy**: Must be injected by the application layer based on the authenticated request context.
