# Device API Specification

## Purpose
Manages peripheral hardware devices, IoT relays, sirens, and physical alarm strobes connected to Edge Boxes.

## Base Route
`/api/v1/devices`

## Authentication
`Bearer JWT` (RS256)

## Authorization (RBAC)
- Read: `Viewer`, `Operator`, `TenantAdmin`.
- Write/Trigger: `Operator`, `TenantAdmin`.

---

## Endpoints

### 1. List Devices

* **Method:** `GET`
* **Route:** `/api/v1/devices`
* **Description:** Retrieves paginated list of peripheral hardware devices.
* **Path Parameters:** None.
* **Query Parameters:** `edgeBoxId`, `deviceType`, `page`, `limit`.
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "deviceId": "dev_01h9...",
        "edgeBoxId": "edg_01h9...",
        "name": "Pool Area Strobe Relay",
        "deviceType": "STROBE_LIGHT",
        "connectionType": "GPIO",
        "status": "ONLINE"
      }
    ],
    "meta": { "pagination": { "page": 1, "limit": 20, "totalElements": 1, "totalPages": 1 } }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `401 Unauthorized`.
* **Error Responses:** `UNAUTHENTICATED`.
* **Validation Rules:** Scoped to tenant.

---

### 2. Trigger Physical Device Relay

* **Method:** `POST`
* **Route:** `/api/v1/devices/{deviceId}/trigger`
* **Description:** Manually triggers a physical alarm siren relay or strobe light.
* **Path Parameters:** `deviceId` (string).
* **Query Parameters:** None.
* **Request Body:**
  ```json
  {
    "durationSeconds": 30,
    "reason": "Manual Operator Alarm Test"
  }
  ```
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "deviceId": "dev_01h9...",
      "status": "TRIGGERED",
      "triggeredUntil": "2026-07-31T09:45:30Z"
    }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `400 Bad Request`, `404 Not Found`.
* **Error Responses:** `DEVICE_OFFLINE`.
* **Validation Rules:** `durationSeconds` integer between 1 and 300.
