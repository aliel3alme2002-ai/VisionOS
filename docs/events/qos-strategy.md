# VisionOS MQTT Quality of Service (QoS) Strategy

This document defines the Quality of Service (QoS) delivery policies for VisionOS MQTT topics.

---

## 1. QoS Allocation Matrix

| Event Category | Target Topic Pattern | QoS Level | Rationale |
| :--- | :--- | :---: | :--- |
| **High-Frequency Telemetry** | `vision/{tenantId}/{edgeId}/edge/heartbeat` | **QoS 0** (At most once) | High frequency (every 5s). Missing an occasional telemetry ping is acceptable and avoids broker ack overhead. |
| **Video Snapshots** | `vision/{tenantId}/{edgeId}/camera/{cameraId}/snapshots` | **QoS 0** (At most once) | Non-critical frame updates; next frame arrives within seconds. |
| **Raw AI Detections** | `vision/{tenantId}/{edgeId}/events` | **QoS 1** (At least once) | Requires guaranteed delivery to `pipeline-service` for rule processing, but handles duplicate deduplication. |
| **Camera & Edge Status** | `vision/{tenantId}/{edgeId}/camera/{cameraId}/status` | **QoS 1** (At least once) | Critical status state transitions must be delivered reliably. |
| **Life-Safety Incident Alerts** | `vision/{tenantId}/{edgeId}/alerts` | **QoS 2** (Exactly once) | **Zero-tolerance for loss or duplicate alerts.** Guarantees siren relays trigger exactly once per incident. |
| **Entitlement & Licenses** | `vision/system/licenses` | **QoS 2** (Exactly once) | Entitlement updates must be delivered with exact once-and-only-once semantics. |

---

## 2. QoS Level Guidelines

- **QoS 0 (Fire and Forget)**: Use for high-frequency, ephemeral data streams where low latency is preferred over delivery guarantees.
- **QoS 1 (Guaranteed Delivery with Retries)**: Default level for standard operational events. Consumers must implement idempotency.
- **QoS 2 (Exactly Once)**: Reserved exclusively for life-safety alarm triggers and license entitlement state updates to prevent duplicate siren relays or duplicate billing entries.
