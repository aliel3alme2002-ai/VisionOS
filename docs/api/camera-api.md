# Camera API Specification

## Purpose
Manages network IP cameras, RTSP stream ingestion settings, ONVIF discovery, and Frigate config generation.

## Base Route
`/api/v1/cameras`

## Authentication
`Bearer JWT` (RS256)

## Authorization (RBAC)
- Read: `Viewer`, `Operator`, `TenantAdmin`.
- Write/Delete: `Operator`, `TenantAdmin`.

---

## Endpoints

### 1. List Cameras

* **Method:** `GET`
* **Route:** `/api/v1/cameras`
* **Description:** Retrieves paginated list of cameras configured on the Edge Box.
* **Path Parameters:** None.
* **Query Parameters:** `edgeBoxId`, `status`, `page`, `limit`.
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "cameraId": "cam_01h9...",
        "edgeBoxId": "edg_01h9...",
        "name": "Pool Camera 01",
        "rtspUrl": "rtsp://admin:pass@192.168.1.50:554/stream1",
        "status": "ONLINE",
        "resolution": "1920x1080",
        "fps": 25
      }
    ],
    "meta": { "pagination": { "page": 1, "limit": 20, "totalElements": 1, "totalPages": 1 } }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `401 Unauthorized`.
* **Error Responses:** `UNAUTHENTICATED`.
* **Validation Rules:** Scoped to tenant.

---

### 2. Create Camera

* **Method:** `POST`
* **Route:** `/api/v1/cameras`
* **Description:** Adds a camera, validates RTSP connectivity, checks license quotas, and regenerates Frigate `config.yml`.
* **Path Parameters:** None.
* **Query Parameters:** None.
* **Request Body:**
  ```json
  {
    "edgeBoxId": "edg_01h9...",
    "name": "Pool Camera 01",
    "rtspUrl": "rtsp://admin:pass@192.168.1.50:554/stream1",
    "onvifHost": "192.168.1.50"
  }
  ```
* **Response Body (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "cameraId": "cam_01h9...",
      "name": "Pool Camera 01",
      "status": "ONLINE"
    }
  }
  ```
* **HTTP Status Codes:** `201 Created`, `400 Bad Request`, `422 Unprocessable Entity`.
* **Error Responses:** `CAMERA_LIMIT_EXCEEDED`, `RTSP_STREAM_UNREACHABLE`.
* **Validation Rules:**
  - `rtspUrl` must start with `rtsp://` or `rtsps://`.
  - Checks active camera count against `License.max_cameras`.

---

### 3. Get Camera Stream Snapshot

* **Method:** `GET`
* **Route:** `/api/v1/cameras/{cameraId}/snapshot`
* **Description:** Fetches real-time JPEG snapshot frame from Frigate stream relay.
* **Path Parameters:** `cameraId` (string).
* **Query Parameters:** `width`, `height`.
* **Request Body:** None.
* **Response Body (200 OK):** Binary JPEG image stream (`image/jpeg`).
* **HTTP Status Codes:** `200 OK`, `404 Not Found`.
* **Error Responses:** `CAMERA_OFFLINE`.
* **Validation Rules:** Camera must be active.
