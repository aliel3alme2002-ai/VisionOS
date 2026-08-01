# VisionOS MQTT Topic Structure & Hierarchy

This document defines the official MQTT topic hierarchy for **VisionOS**.

---

## 1. Topic Naming Conventions

All VisionOS topics follow a strict hierarchical structure using slash delimiters (`/`) and lowercase alphanumeric tokens:

```
vision/{tenantId}/{edgeId}/{domain}/{entityId}/{action}
```

System-level global infrastructure events use the `vision/system/` prefix:

```
vision/system/{domain}/{action}
```

---

## 2. Topic Hierarchy Map

```
vision/
├── {tenantId}/
│   └── {edgeId}/
│        ├── camera/
│        │   ├── {cameraId}/status
│        │   ├── {cameraId}/health
│        │   └── {cameraId}/snapshots
│        ├── edge/
│        │   ├── status
│        │   └── heartbeat
│        ├── events
│        ├── alerts
│        ├── notifications
│        └── dlq
└── system/
     ├── licenses
     └── health
```

---

## 3. Detailed Topic Specifications

### 3.1 Edge Node & Camera Topics

| Topic Pattern | Description | Publisher | Subscribers |
| :--- | :--- | :--- | :--- |
| `vision/{tenantId}/{edgeId}/edge/status` | Edge Box connection state (`ONLINE`/`OFFLINE`). | Edge Box Runtime | `camera-service`, `admin-dashboard` |
| `vision/{tenantId}/{edgeId}/edge/heartbeat` | Periodic telemetry (CPU/GPU temp, memory). | Edge Box Runtime | Infrastructure Monitoring |
| `vision/{tenantId}/{edgeId}/camera/{cameraId}/status` | IP camera RTSP connection status. | Frigate NVR / Camera Svc | `customer-dashboard`, `pipeline-service` |
| `vision/{tenantId}/{edgeId}/camera/{cameraId}/health` | Camera stream FPS and dropped frame metrics. | Frigate NVR | `camera-service` |
| `vision/{tenantId}/{edgeId}/camera/{cameraId}/snapshots` | Periodic JPEG snapshot frame broadcasts. | Frigate NVR | Dashboard Live Feed |

### 3.2 Detection, Alert & Policy Topics

| Topic Pattern | Description | Publisher | Subscribers |
| :--- | :--- | :--- | :--- |
| `vision/{tenantId}/{edgeId}/events` | Raw computer vision object detections (`frigate/events`). | Frigate NVR / Custom AI | `pipeline-service`, `rule-engine` |
| `vision/{tenantId}/{edgeId}/alerts` | Evaluated incident alerts (`CRITICAL`, `LIFE_SAFETY`). | `pipeline-service` | `notification-service`, Local Siren Relay |
| `vision/{tenantId}/{edgeId}/notifications` | Formatted multi-channel notification dispatches. | `notification-service` | WebSocket Gateway, Push Worker |
| `vision/{tenantId}/{edgeId}/dlq` | Dead-letter queue for unparseable payloads. | Message Consumers | DLQ Monitor, Alert Dispatcher |

### 3.3 System Control Topics

| Topic Pattern | Description | Publisher | Subscribers |
| :--- | :--- | :--- | :--- |
| `vision/system/licenses` | Global license key updates & revocations. | `license-service` | All Edge Boxes, `camera-service` |
| `vision/system/health` | Platform-wide service mesh telemetry checks. | Cloud Health Monitor | Ops Monitoring |

---

## 4. MQTT Wildcard Subscription Rules

- **Tenant Scope Wildcard**: `vision/tnt_01h9/#` (Subscribes to all events within tenant `tnt_01h9`).
- **All Edge Camera Events**: `vision/tnt_01h9/edg_01/camera/+/status` (Subscribes to status updates of all cameras under `edg_01`).
- **Global Alert Monitoring**: `vision/+/+/alerts` (Allowed for platform SuperAdmins only).
