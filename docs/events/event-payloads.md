# VisionOS Event Payloads & JSON Schemas

This document specifies the standard event wrapper and payload schemas for all VisionOS domain events.

---

## 1. Universal Event Envelope Header

All event messages published to the VisionOS MQTT message bus MUST encapsulate their payload within the standard envelope header:

```json
{
  "eventId": "evt_01h9x82b1c3d4e5f6g7h8j9k",
  "eventType": "vision.event.created",
  "eventVersion": 1,
  "timestamp": "2026-07-31T09:45:00.123Z",
  "tenantId": "tnt_01h9x82b",
  "edgeId": "edg_01h9x82b",
  "correlationId": "cor_9988776655443322",
  "requestId": "req_1122334455667788",
  "publisher": "frigate-nvr-edge-01",
  "payload": { }
}
```

---

## 2. Event Payload Specifications

### 2.1 `vision.event.created` (Raw Vision Detection)

* **Purpose:** Broadcasts raw object detection observation captured by vision AI engines.
* **Publisher:** Frigate NVR / `ai-custom-service` (Edge Box)
* **Subscribers:** `pipeline-service`, `rule-engine`
* **JSON Payload Example:**
  ```json
  {
    "eventId": "evt_01h9x82b1c3d4e5f6g7h8j9k",
    "eventType": "vision.event.created",
    "eventVersion": 1,
    "timestamp": "2026-07-31T09:45:00.123Z",
    "tenantId": "tnt_01h9x82b",
    "edgeId": "edg_01h9x82b",
    "correlationId": "cor_9988776655443322",
    "requestId": "req_1122334455667788",
    "publisher": "frigate-nvr-edge-01",
    "payload": {
      "cameraId": "cam_01h9x82b",
      "zoneId": "zon_01h9x82b",
      "label": "person",
      "confidence": 0.94,
      "boundingBox": [120, 340, 210, 580],
      "snapshotUrl": "https://cdn.visionos.ai/snapshots/evt_01h9.jpg"
    }
  }
  ```

---

### 2.2 `vision.alert.created` (Life-Safety Alert Trigger)

* **Purpose:** Broadcasts evaluated high-priority safety incident requiring immediate intervention.
* **Publisher:** `pipeline-service`
* **Subscribers:** `notification-service`, Local Siren Relay, Customer Dashboard
* **JSON Payload Example:**
  ```json
  {
    "eventId": "evt_01h9x82b9988776655443322",
    "eventType": "vision.alert.created",
    "eventVersion": 1,
    "timestamp": "2026-07-31T09:45:01.050Z",
    "tenantId": "tnt_01h9x82b",
    "edgeId": "edg_01h9x82b",
    "correlationId": "cor_9988776655443322",
    "requestId": "req_1122334455667788",
    "publisher": "pipeline-service-edge",
    "payload": {
      "alertId": "alt_01h9x82b",
      "ruleId": "rul_01h9x82b",
      "severity": "LIFE_SAFETY",
      "title": "Drowning Danger Detected",
      "message": "Submerged motion in Children Pool Zone > 15 seconds",
      "snapshotUrl": "https://cdn.visionos.ai/snapshots/evt_01h9.jpg"
    }
  }
  ```

---

### 2.3 `vision.edge.heartbeat` (Hardware Telemetry)

* **Purpose:** Reports periodic edge server compute metrics.
* **Publisher:** Edge Box Runtime
* **Subscribers:** Infrastructure Telemetry Monitor
* **JSON Payload Example:**
  ```json
  {
    "eventId": "evt_01h9x82bhb00112233445566",
    "eventType": "vision.edge.heartbeat",
    "eventVersion": 1,
    "timestamp": "2026-07-31T09:45:05.000Z",
    "tenantId": "tnt_01h9x82b",
    "edgeId": "edg_01h9x82b",
    "correlationId": "cor_hb_01h9x82b",
    "requestId": "req_hb_01h9x82b",
    "publisher": "edge-runtime-node-01",
    "payload": {
      "cpuTemp": 42.5,
      "gpuTemp": 51.0,
      "cpuUtil": 18.2,
      "memoryUtil": 45.0,
      "activeStreams": 4
    }
  }
  ```

---

### 2.4 `vision.notification.sent` (Dispatch Receipt)

* **Purpose:** Confirms multi-channel notification delivery.
* **Publisher:** `notification-service`
* **Subscribers:** Notification Audit Logger, Dashboards
* **JSON Payload Example:**
  ```json
  {
    "eventId": "evt_01h9x82bntf001122334455",
    "eventType": "vision.notification.sent",
    "eventVersion": 1,
    "timestamp": "2026-07-31T09:45:02.100Z",
    "tenantId": "tnt_01h9x82b",
    "edgeId": "edg_01h9x82b",
    "correlationId": "cor_9988776655443322",
    "requestId": "req_1122334455667788",
    "publisher": "notification-service-cloud",
    "payload": {
      "notificationId": "ntf_01h9x82b",
      "alertId": "alt_01h9x82b",
      "channel": "SMS",
      "recipient": "+1234567890",
      "status": "DELIVERED"
    }
  }
  ```
