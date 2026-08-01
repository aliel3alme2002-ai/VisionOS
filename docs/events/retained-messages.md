# VisionOS MQTT Retained Messages Policy

This document details the policy governing retained messages on Mosquitto MQTT brokers.

---

## 1. Retained Message Topics

The following MQTT topics MUST be published with `retained: true`:

| Retained Topic Pattern | Payload Contents | Rationale |
| :--- | :--- | :--- |
| `vision/{tenantId}/{edgeId}/edge/status` | Current Edge Box connection state (`ONLINE`/`OFFLINE`). | Allows new dashboard clients connecting to broker to immediately render node state without waiting for next status event. |
| `vision/{tenantId}/{edgeId}/camera/{cameraId}/status` | Current IP camera RTSP connection status (`ONLINE`/`OFFLINE`). | Ensures new subscribers instantly know active camera connectivity upon connection. |
| `vision/system/licenses` | Active license entitlement key & feature flags. | Edge Box restarts can instantly read current valid license state from broker memory without cloud polling. |

---

## 2. Non-Retained Message Topics

The following topics MUST NEVER use retained messages (`retained: false`):
- `vision/{tenantId}/{edgeId}/events` (Raw detections are transient).
- `vision/{tenantId}/{edgeId}/alerts` (Alerts must be evaluated in real time; retaining stale alerts would re-trigger old siren alarms on client reconnect).
- `vision/{tenantId}/{edgeId}/notifications` (Dispatches are single-use delivery attempts).

---

## 3. Retained Message Clearing

To clear a retained topic state, publish an empty zero-byte payload with `retained: true` to the target topic.
