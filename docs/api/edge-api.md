# Edge Box API Specification

## Purpose
Manages on-premise Edge Box hardware registration, HWID activation check-ins, heartbeat telemetry, and Frigate NVR configuration sync.

## Base Route
`/api/v1/edge-boxes`

## Authentication
`Bearer JWT` (RS256) / Hardware Client Certs (mTLS)

## Authorization (RBAC)
- Read: `Operator`, `TenantAdmin`, `SuperAdmin`.
- Write/Activate: `TenantAdmin`, `SuperAdmin`.

---

## Endpoints

### 1. Register / Activate Edge Box

* **Method:** `POST`
* **Route:** `/api/v1/edge-boxes/activate`
* **Description:** Binds a physical Edge Box hardware server to a tenant site using cryptographic HWID signatures.
* **Path Parameters:** None.
* **Query Parameters:** None.
* **Request Body:**
  ```json
  {
    "siteId": "sit_01h9...",
    "hardwareId": "HWID-CPU-98234-MAC-A1B2C3D4E5F6",
    "licenseKey": "LIC-KEY-RSA4096-SIGNATURE...",
    "hostname": "edge-box-pool-01",
    "localIp": "192.168.1.100"
  }
  ```
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "edgeBoxId": "edg_01h9...",
      "status": "ONLINE",
      "registeredAt": "2026-07-31T09:45:00Z"
    }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `400 Bad Request`, `422 Unprocessable Entity`.
* **Error Responses:** `INVALID_HWID_SIGNATURE`, `LICENSE_EXPIRED`.
* **Validation Rules:** `hardwareId` and valid signed `licenseKey` matching HWID required.

---

### 2. Edge Box Heartbeat Check-In

* **Method:** `POST`
* **Route:** `/api/v1/edge-boxes/{edgeBoxId}/heartbeat`
* **Description:** Edge node periodic health check-in reporting CPU/GPU temperature, FPS counter, and stream status.
* **Path Parameters:** `edgeBoxId` (string).
* **Query Parameters:** None.
* **Request Body:**
  ```json
  {
    "cpuTemp": 42.5,
    "gpuTemp": 51.0,
    "cpuUtil": 18.2,
    "memoryUtil": 45.0,
    "activeStreams": 4
  }
  ```
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "acknowledged": true,
      "configVersionSynced": true
    }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `401 Unauthorized`.
* **Error Responses:** `UNAUTHENTICATED`.
* **Validation Rules:** Sent by Edge Box runtime.
