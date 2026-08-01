# VisionOS Roadmap (`docs/roadmap`)

This directory documents the release milestone roadmap, feature goals, and architectural evolution phases for VisionOS.

## Phased Execution Plan

### Phase 1: Baseline Architecture & Edge Vision (Current)
- Monorepo structure setup (`apps/`, `services/`, `packages/`, `infra/`, `docs/`).
- Frigate NVR evaluation and selection.
- System Design Specification definition.

### Phase 2: Core Microservices & Data Plane
- Implement `@visionos/shared` types and DTO contracts.
- Build `auth-service` with RS256 JWT and RBAC enforcement.
- Implement `camera-service` with ONVIF probe and Frigate YAML syncing.
- Implement `pipeline-service` MQTT consumer and rules engine.

### Phase 3: Dashboard Web Applications & Real-Time Alerts
- Build `@visionos/ui` component design system.
- Implement `customer-dashboard` with WebRTC streams and live alert player.
- Implement `admin-dashboard` tenant and node monitoring.
- Build `notification-service` WebSocket gateway and SMS dispatcher.

### Phase 4: ERP Integrations & Advanced Analytics
- Build `erp-service` with SAP and Odoo connectors.
- Build `report-service` PDF export engine.
- Deploy billing lifecycle in `billing-service`.
