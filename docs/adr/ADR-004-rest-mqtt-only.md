# ADR-004: Protocol Stack — REST API & MQTT Only for MVP

* **Status:** Accepted
* **Date:** 2026-07-31
* **Deciders:** VisionOS Architecture Team

---

## 1. Context

VisionOS microservices communicate synchronously (client-to-server requests, management commands) and asynchronously (real-time camera events, safety alarm triggers).

Introducing gRPC Protobuf schemas and service mesh topologies during early MVP development adds RPC compilation step friction and debugging complexity before API contracts have stabilized.

---

## 2. Decision

The VisionOS MVP protocol stack is standardized strictly on:
1. **REST API (HTTP/JSON)**: Used for synchronous API endpoints, admin CRUD operations, authentication, and client dashboards.
2. **MQTT**: Used for real-time, asynchronous edge-to-cloud event streaming and Frigate event consumption (`frigate/events`).

**gRPC and RPC service meshes are explicitly excluded for MVP.**

---

## 3. Consequences

### Positive
* **Rapid Prototyping & Inspection:** Standard HTTP/JSON APIs and MQTT JSON topics are easy to debug with web browsers, Postman, and MQTT Explorer.
* **Native Alignment with Frigate:** Frigate publishes detection payloads natively via MQTT JSON.
* **Simplified Tooling:** Eliminates mandatory Protobuf code generation steps for MVP service development.

### Tradeoffs / Negative
* JSON payloads have higher serialization size and parsing cost compared to binary gRPC Protobuf. High-throughput inter-service microservice IPC can be evaluated for gRPC migration in post-MVP scaling phases.
