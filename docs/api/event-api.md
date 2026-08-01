# Event API Specification

## Purpose
Provides querying, filtering, and retrieval endpoints for raw computer vision and hardware sensor event telemetry logs.

## Base Route
`/api/v1/events`

## Authentication
`Bearer JWT` (RS256)

## Authorization (RBAC)
- Read: `Viewer`, `Operator`, `TenantAdmin`, `SuperAdmin`.

---

## Endpoints

### 1. List Computer Vision Events (Filtered & Paginated)

* **Method:** `GET`
* **Route:** `/api/v1/events`
* **Description:** Queries historical vision event logs with filtering, sorting, date ranges, and tenant scoping.
* **Path Parameters:** None.
* **Query Parameters:**
  - `page` (int, default: 1)
  - `limit` (int, default: 20, max: 100)
  - `eventType` (string: `PERSON`, `INTRUSION`, `DROWNING_ALERT`, `OCCUPANCY_COUNT`)
  - `siteId` (string)
  - `cameraId` (string)
  - `zoneId` (string)
  - `startDate` (ISO 8601 UTC string)
  - `endDate` (ISO 8601 UTC string)
  - `minConfidence` (float, 0.0 to 1.0)
  - `sort` (string, default: `timestamp:desc`)
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "eventId": "evt_01h9...",
        "cameraId": "cam_01h9...",
        "zoneId": "zon_01h9...",
        "eventType": "DROWNING_ALERT",
        "confidence": 0.96,
        "boundingBox": [120, 340, 210, 580],
        "snapshotUrl": "https://cdn.visionos.ai/snapshots/evt_01h9.jpg",
        "timestamp": "2026-07-31T09:45:00Z"
      }
    ],
    "meta": {
      "pagination": {
        "page": 1,
        "limit": 20,
        "totalElements": 1,
        "totalPages": 1,
        "hasNextPage": false,
        "hasPreviousPage": false
      },
      "timestamp": "2026-07-31T09:45:00Z",
      "requestId": "req_10293847"
    }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `400 Bad Request`, `401 Unauthorized`.
* **Error Responses:** `INVALID_DATE_RANGE`, `UNAUTHENTICATED`.
* **Validation Rules:**
  - `startDate` and `endDate` must be valid ISO 8601 strings.
  - Queries strictly scoped to authenticated user's `tenantId`.

---

### 2. Get Event Details

* **Method:** `GET`
* **Route:** `/api/v1/events/{eventId}`
* **Description:** Retrieves details and snapshot image URI of a specific event.
* **Path Parameters:** `eventId` (string).
* **Query Parameters:** None.
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "eventId": "evt_01h9...",
      "cameraId": "cam_01h9...",
      "zoneId": "zon_01h9...",
      "eventType": "DROWNING_ALERT",
      "confidence": 0.96,
      "boundingBox": [120, 340, 210, 580],
      "snapshotUrl": "https://cdn.visionos.ai/snapshots/evt_01h9.jpg",
      "timestamp": "2026-07-31T09:45:00Z"
    }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `404 Not Found`.
* **Error Responses:** `RESOURCE_NOT_FOUND`.
* **Validation Rules:** Tenant isolation enforced.
