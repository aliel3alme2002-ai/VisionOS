# Apps Directory

The `apps/` directory contains all user-facing web applications within the VisionOS monorepo.

## Included Applications

- **[`admin-dashboard`](./admin-dashboard/README.md)**: Web application for system administrators, DevOps, and platform operators.
- **[`customer-dashboard`](./customer-dashboard/README.md)**: Web application for end customers, enterprise client managers, and security operators.

## Responsibilities & Guidelines

- **UI Consistency**: Applications must import UI components and design tokens from `@visionos/ui`.
- **API Interaction**: Applications should consume services via the `@visionos/sdk` package for type safety and API contract compliance.
- **State Management & Routing**: Front-end applications manage UI state locally and handle client-side routing. Business logic is deferred to underlying microservices.
