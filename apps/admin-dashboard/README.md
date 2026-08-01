# Admin Dashboard (`apps/admin-dashboard`)

## Responsibility

The `admin-dashboard` application is the central administrative management portal for VisionOS platform operators and super-administrators.

## Core Features & Boundaries

- **Tenant & Organization Management**: Provisioning new customer accounts, configuring tenant quotas, and managing licenses.
- **Node & Infrastructure Monitoring**: Real-time status of Frigate NVR instances, pipeline workers, and custom AI inference nodes.
- **System Audit Logs**: Global view of user access logs, API key usage, and system-wide security audits.
- **Global Configuration**: System feature flags, global pricing tiers, and service integration credentials.

## Dependencies

- `@visionos/ui`: Shared UI design system and admin layout templates.
- `@visionos/sdk`: Client API bindings for VisionOS microservices.
- `@visionos/shared`: Domain types, constants, and permissions schemas.
