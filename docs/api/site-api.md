# Site API Specification

## Purpose
Manages physical customer site facilities and geographic property entries.

## Base Route
`/api/v1/sites`

## Authentication
`Bearer JWT` (RS256)

## Authorization (RBAC)
- Read: `Viewer`, `Operator`, `TenantAdmin`, `SuperAdmin`.
- Write/Delete: `TenantAdmin`, `SuperAdmin`.

---

## Endpoints

### 1. List Sites

* **Method:** `GET`
* **Route:** `/api/v1/sites`
* **Description:** Retrieves paginated list of sites for the tenant.
* **Path Parameters:** None.
* **Query Parameters:** `page`, `limit`, `search`.
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "siteId": "sit_01h9...",
        "name": "Main Resort Complex",
        "address": "100 Beach Front Rd",
        "timezone": "UTC"
      }
    ],
    "meta": { "pagination": { "page": 1, "limit": 20, "totalElements": 1, "totalPages": 1 } }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `401 Unauthorized`.
* **Error Responses:** `UNAUTHENTICATED`.
* **Validation Rules:** Valid pagination.

---

### 2. Create Site

* **Method:** `POST`
* **Route:** `/api/v1/sites`
* **Description:** Creates a new physical site facility.
* **Path Parameters:** None.
* **Query Parameters:** None.
* **Request Body:**
  ```json
  {
    "name": "Main Resort Complex",
    "address": "100 Beach Front Rd",
    "latitude": 25.1234,
    "longitude": 55.5678,
    "timezone": "Asia/Dubai"
  }
  ```
* **Response Body (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "siteId": "sit_01h9...",
      "name": "Main Resort Complex",
      "address": "100 Beach Front Rd",
      "timezone": "Asia/Dubai"
    }
  }
  ```
* **HTTP Status Codes:** `201 Created`, `400 Bad Request`.
* **Error Responses:** `INVALID_INPUT`.
* **Validation Rules:** `name` non-empty, `timezone` valid IANA timezone string.
