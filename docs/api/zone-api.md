# Zone API Specification

## Purpose
Manages spatial Region of Interest (ROI) polygon boundaries monitored by vision rules.

## Base Route
`/api/v1/zones`

## Authentication
`Bearer JWT` (RS256)

## Authorization (RBAC)
- Read: `Viewer`, `Operator`, `TenantAdmin`.
- Write/Delete: `Operator`, `TenantAdmin`.

---

## Endpoints

### 1. List Zones

* **Method:** `GET`
* **Route:** `/api/v1/zones`
* **Description:** Retrieves paginated list of zones for a camera or floor.
* **Path Parameters:** None.
* **Query Parameters:** `cameraId`, `floorId`, `zoneType`, `page`, `limit`.
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "zoneId": "zon_01h9...",
        "cameraId": "cam_01h9...",
        "name": "Children Deep Water Zone",
        "zoneType": "POOL",
        "coordinates": [
          { "x": 0.1, "y": 0.2 },
          { "x": 0.5, "y": 0.2 },
          { "x": 0.5, "y": 0.8 },
          { "x": 0.1, "y": 0.8 }
        ]
      }
    ],
    "meta": { "pagination": { "page": 1, "limit": 20, "totalElements": 1, "totalPages": 1 } }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `401 Unauthorized`.
* **Error Responses:** `UNAUTHENTICATED`.
* **Validation Rules:** Scoped to tenant.

---

### 2. Create Zone

* **Method:** `POST`
* **Route:** `/api/v1/zones`
* **Description:** Creates a ROI polygon zone on a camera feed.
* **Path Parameters:** None.
* **Query Parameters:** None.
* **Request Body:**
  ```json
  {
    "cameraId": "cam_01h9...",
    "floorId": "flr_01h9...",
    "name": "Children Deep Water Zone",
    "zoneType": "POOL",
    "coordinates": [
      { "x": 0.1, "y": 0.2 },
      { "x": 0.5, "y": 0.2 },
      { "x": 0.5, "y": 0.8 },
      { "x": 0.1, "y": 0.8 }
    ]
  }
  ```
* **Response Body (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "zoneId": "zon_01h9...",
      "cameraId": "cam_01h9...",
      "name": "Children Deep Water Zone",
      "zoneType": "POOL"
    }
  }
  ```
* **HTTP Status Codes:** `201 Created`, `400 Bad Request`.
* **Error Responses:** `INVALID_POLYGON_COORDINATES`.
* **Validation Rules:** `coordinates` must contain at least 3 vertices with normalized x, y between 0.0 and 1.0.
