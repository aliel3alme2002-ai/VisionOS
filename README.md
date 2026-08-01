# VisionOS Monorepo Architecture

Welcome to **VisionOS**, an enterprise-grade AI-powered video analytics, computer vision management, and ERP integration platform.

## Architecture Overview

VisionOS uses a microservices architecture managed within a unified Node.js monorepo. The architecture decouples real-time video stream processing and AI inference pipelines from core business applications, user dashboards, and third-party integrations.

```
                                 ┌───────────────────────────┐
                                 │   Frigate NVR / Cameras   │
                                 └─────────────┬─────────────┘
                                               │ RTSP / MQTT
                                               ▼
                                 ┌───────────────────────────┐
                                 │     camera-service        │
                                 └─────────────┬─────────────┘
                                               │ Events / Streams
                                               ▼
                                 ┌───────────────────────────┐
                                 │    pipeline-service       │
                                 └─────────────┬─────────────┘
                                               │ Trigger Inference
                                               ▼
                                 ┌───────────────────────────┐
                                 │   ai-custom-service       │
                                 └─────────────┬─────────────┘
                                               │ Detections & Alerts
                                               ▼
 ┌───────────────────────┐       ┌───────────────────────────┐       ┌───────────────────────┐
 │   admin-dashboard     ├──────►│    notification-service   │◄──────┤  customer-dashboard   │
 └───────────────────────┘       └─────────────┬─────────────┘       └───────────────────────┘
                                               │ Business Events
                                               ▼
                                 ┌───────────────────────────┐
                                 │  auth / erp / billing /   │
                                 │  license / report services│
                                 └───────────────────────────┘
```

## Directory Structure

- **`apps/`**: End-user front-end applications (Admin & Customer web applications).
- **`services/`**: Independent backend microservices (Auth, ERP, Camera, Pipeline, AI, Billing, Reports, Notifications, Licensing).
- **`packages/`**: Shared internal libraries, design systems, data transfer objects (DTOs), and API SDKs.
- **`infra/`**: Infrastructure as Code (IaC), Docker configurations, and Frigate NVR integration configs.
- **`docs/`**: Architectural Decision Records (ADRs), system design specs, research sprints, API specs, product notes, and roadmap.
- **`.cursor/`**: Workspace context, architecture rules, and project state configuration for Cursor / AI assistants.
- **`scripts/`**: Automation scripts for build, deployment, and database migrations.
- **`.github/workflows/`**: Continuous Integration and Continuous Deployment (CI/CD) pipelines.

## Subdirectory Summary

| Path | Responsibility |
| :--- | :--- |
| [`apps/admin-dashboard`](./apps/admin-dashboard/README.md) | Platform management portal for system administration, tenant configuration, and node monitoring. |
| [`apps/customer-dashboard`](./apps/customer-dashboard/README.md) | End-user customer portal for video streams, event alerts, analytics reports, and billing. |
| [`services/auth-service`](./services/auth-service/README.md) | Identity management, authentication, RBAC authorization, and token issuance. |
| [`services/erp-service`](./services/erp-service/README.md) | Integration bridge with external ERPs (SAP, Odoo, QuickBooks, custom APIs). |
| [`services/license-service`](./services/license-service/README.md) | Feature entitlement, API key provisioning, and software license validation. |
| [`services/camera-service`](./services/camera-service/README.md) | Camera stream management, RTSP URL provisioning, and Frigate NVR synchronization. |
| [`services/pipeline-service`](./services/pipeline-service/README.md) | Real-time stream ingest, frame processing pipeline orchestrator, and event routing. |
| [`services/ai-custom-service`](./services/ai-custom-service/README.md) | Computer vision inference engine wrapper (YOLO, custom ONNX/TensorRT models). |
| [`services/notification-service`](./services/notification-service/README.md) | Multi-channel messaging dispatcher (WebSocket, Push, Email, Webhooks, SMS). |
| [`services/billing-service`](./services/billing-service/README.md) | Tenant subscription management, usage metering, payment gateway integrations. |
| [`services/report-service`](./services/report-service/README.md) | Aggregated analytics, PDF/CSV report generation, and historical data export. |
| [`packages/shared`](./packages/shared/README.md) | Universal types, utility functions, common error schemas, and constants. |
| [`packages/sdk`](./packages/sdk/README.md) | Strongly-typed JavaScript/TypeScript API client SDK for internal & external consumers. |
| [`packages/ui`](./packages/ui/README.md) | Shared UI component library and design system tokens. |
| [`infra/docker`](./infra/docker/README.md) | Docker Compose configurations, container Dockerfiles, and container orchestration scripts. |
| [`infra/frigate-config`](./infra/frigate-config/README.md) | Frigate NVR configuration files, camera YAML presets, and hardware acceleration configs. |
| [`docs/architecture`](./docs/architecture/system-design.md) | Official System Design and Architecture Specification. |
| [`docs/research-sprint`](./docs/research-sprint/catalog.md) | Technical evaluation of NVR and Vision Stack platforms (Frigate vs Shinobi vs ZoneMinder). |
| [`docs/roadmap`](./docs/roadmap/README.md) | Product and architectural evolution roadmap. |
| [`docs/adr`](./docs/adr/README.md) | Architectural Decision Records (ADRs). |
| [`docs/api`](./docs/api/README.md) | OpenAPI and gRPC API contract specifications. |
| [`docs/product`](./docs/product/README.md) | Product requirement documents (PRDs) and user stories. |
