# Services Directory

The `services/` directory contains all backend microservices comprising the VisionOS server-side platform architecture.

## Microservices Catalog

| Service | Responsibility |
| :--- | :--- |
| **[`auth-service`](./auth-service/README.md)** | User authentication, identity management, JWT issuance, and RBAC policies. |
| **[`erp-service`](./erp-service/README.md)** | Enterprise Resource Planning (ERP) integrations (SAP, Odoo, QuickBooks, custom webhooks). |
| **[`license-service`](./license-service/README.md)** | Subscription license verification, offline feature activation, and token key management. |
| **[`camera-service`](./camera-service/README.md)** | IP camera discovery, ONVIF/RTSP metadata, and Frigate NVR sync. |
| **[`pipeline-service`](./pipeline-service/README.md)** | Video frame ingestion, stream processing orchestrator, and event routing pipeline. |
| **[`ai-custom-service`](./ai-custom-service/README.md)** | Specialized AI model runtime, ONNX/TensorRT inference service, and custom model loader. |
| **[`notification-service`](./notification-service/README.md)** | Real-time notification dispatching (WebSocket, SMS, Email, Webhooks, Push). |
| **[`billing-service`](./billing-service/README.md)** | Tenant subscriptions, payment gateway integrations, usage metering, and invoicing. |
| **[`report-service`](./report-service/README.md)** | Historical data aggregation, analytical metrics query engine, and PDF/CSV report generation. |

## Architectural Rules

1. **Domain Isolation**: Each microservice maintains its own isolated database/data-store. Direct cross-database joins between microservices are strictly prohibited.
2. **Contract-Driven Communication**: Services communicate asynchronously via message brokers (e.g. RabbitMQ / NATS / Redis Streams) or synchronously via gRPC/REST APIs exposed through `@visionos/sdk`.
3. **Shared Packages**: Common utilities, shared types, and RPC DTOs must be sourced from `@visionos/shared`.
