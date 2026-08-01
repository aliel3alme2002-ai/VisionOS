# VisionOS Event-Driven Architecture Specification

This directory contains the official Event Architecture specification for **VisionOS**.

---

## 1. Architectural Philosophy
VisionOS leverages an **Event-Driven Architecture (EDA)** built around real-time MQTT message buses to decouple edge computer vision ingestion from cloud business orchestration, notification dispatching, and ERP synchronizations.

Key Characteristics:
- **Sub-second Event Routing**: Edge AI events are broadcast instantaneously to local and cloud subscribers over MQTT.
- **Strict Tenant Isolation**: All MQTT topic hierarchies strictly isolate message streams by `tenantId`.
- **Traceability**: Unified headers (`correlationId`, `requestId`) propagate across all event lifecycles.
- **Resiliency**: Guaranteed delivery policies (QoS 1 / QoS 2), retained state topics, and exponential backoff retry mechanisms.

---

## 2. Specification Directory

| Document | Description |
| :--- | :--- |
| [MQTT Topic Structure](file:///E:/VisionOS/docs/events/mqtt-topics.md) | Scalable topic hierarchy, wildcard rules, publisher & subscriber mapping. |
| [Event Catalog](file:///E:/VisionOS/docs/events/event-catalog.md) | Complete inventory of domain event types (`vision.camera.*`, `vision.alert.*`). |
| [Event Payloads](file:///E:/VisionOS/docs/events/event-payloads.md) | JSON schemas, correlation IDs, timestamps, and example payloads for all events. |
| [Event Lifecycle & Propagation](file:///E:/VisionOS/docs/events/event-lifecycle.md) | Event flow from camera capture to alarm trigger, trace ID propagation. |
| [Event Versioning Policy](file:///E:/VisionOS/docs/events/event-versioning.md) | Schema versioning (`eventVersion`), forward compatibility & deprecation rules. |
| [QoS Strategy](file:///E:/VisionOS/docs/events/qos-strategy.md) | Quality of Service allocations (QoS 0, 1, 2) per event category. |
| [Retry & Backoff Strategy](file:///E:/VisionOS/docs/events/retry-strategy.md) | Retry limits, exponential backoff, jitter algorithms, and failure handling. |
| [Retained Messages Strategy](file:///E:/VisionOS/docs/events/retained-messages.md) | Retained topic state policy for camera status, node health, and active licenses. |
| [Dead-Letter Queue (DLQ) Strategy](file:///E:/VisionOS/docs/events/dead-letter-strategy.md) | Dead-letter topic routing, unparseable payload handling, and recovery tools. |
| [Event Bus Security & ACLs](file:///E:/VisionOS/docs/events/security.md) | MQTT authentication, topic-level authorization ACLs, and tenant isolation rules. |
