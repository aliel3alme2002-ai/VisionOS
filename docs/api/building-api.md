# Building API Specification

## Purpose
Manages architectural building structures located within physical sites.

## Base Route
`/api/v1/buildings`

## Authentication
`Bearer JWT` (RS256)

## Authorization (RBAC)
- Read: `Viewer`, `Operator`, `TenantAdmin`.
- Write/Delete: `TenantAdmin`.

---

## Endpoints

### 1. List Buildings

* **Method:** `GET`
* **Route:** `/api/v1/buildings`
* **Description:** Retrieves paginated list of buildings.
* **Path Parameters:** None.
* **Query Parameters:** `siteId`, `page`, `limit`.
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "buildingId": "bld_01h9...",
        "siteId": "sit_01h9...",
        "name": "Tower A",
        "code": "TWR_A"
      }
    ],
    "meta": { "pagination": { "page": 1, "limit": 20, "totalElements": 1, "totalPages": 1 } }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `401 Unauthorized`.
* **Error Responses:** `UNAUTHENTICATED`.
* **Validation Rules:** Scoped to tenant.

---

### 2. Create Building

* **Method:** `POST`
* **Route:** `/api/v1/buildings`
* **Description:** Creates a building within a site.
* **Path Parameters:** None.
* **Query Parameters:** None.
* **Request Body:**
  ```json
  {
    "siteId": "sit_01h9...",
    "name": "Tower A",
    "code": "TWR_A"
  }
  ```
* **Response Body (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "buildingId": "bld_01h9...",
      "siteId": "sit_01h9...",
      "name": "Tower A",
      "code": "TWR_A"
    }
  }
  ```
* **HTTP Status Codes:** `201 Created`, `400 Bad Request`.
* **Error Responses:** `INVALID_SITE_ID`.
* **Validation Rules:** `siteId` must exist in tenant scope.
