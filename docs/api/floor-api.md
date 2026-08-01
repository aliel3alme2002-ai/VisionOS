# Floor API Specification

## Purpose
Manages building floor levels and architectural floorplan asset uploads.

## Base Route
`/api/v1/floors`

## Authentication
`Bearer JWT` (RS256)

## Authorization (RBAC)
- Read: `Viewer`, `Operator`, `TenantAdmin`.
- Write/Delete: `TenantAdmin`.

---

## Endpoints

### 1. List Floors

* **Method:** `GET`
* **Route:** `/api/v1/floors`
* **Description:** Retrieves list of floors filtered by building.
* **Path Parameters:** None.
* **Query Parameters:** `buildingId`, `page`, `limit`.
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "floorId": "flr_01h9...",
        "buildingId": "bld_01h9...",
        "name": "Ground Floor",
        "levelNumber": 0,
        "floorplanUrl": "https://cdn.visionos.ai/floorplans/flr_01h9.png"
      }
    ],
    "meta": { "pagination": { "page": 1, "limit": 20, "totalElements": 1, "totalPages": 1 } }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `401 Unauthorized`.
* **Error Responses:** `UNAUTHENTICATED`.
* **Validation Rules:** Scoped to tenant.

---

### 2. Create Floor

* **Method:** `POST`
* **Route:** `/api/v1/floors`
* **Description:** Creates a floor level within a building.
* **Path Parameters:** None.
* **Query Parameters:** None.
* **Request Body:**
  ```json
  {
    "buildingId": "bld_01h9...",
    "name": "Ground Floor",
    "levelNumber": 0,
    "floorplanUrl": "https://cdn.visionos.ai/floorplans/flr_01h9.png"
  }
  ```
* **Response Body (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "floorId": "flr_01h9...",
      "buildingId": "bld_01h9...",
      "name": "Ground Floor",
      "levelNumber": 0
    }
  }
  ```
* **HTTP Status Codes:** `201 Created`, `400 Bad Request`.
* **Error Responses:** `INVALID_BUILDING_ID`.
* **Validation Rules:** `levelNumber` integer required.
