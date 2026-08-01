# Tenant API Specification

## Purpose
Manages multi-tenant organization accounts, tenant lifecycle states, and customer provisioning.

## Base Route
`/api/v1/tenants`

## Authentication
`Bearer JWT` (RS256)

## Authorization (RBAC)
- Require `SuperAdmin` role for global CRUD operations.
- Require `TenantAdmin` role for viewing own tenant info.

---

## Endpoints

### 1. List Tenants

* **Method:** `GET`
* **Route:** `/api/v1/tenants`
* **Description:** Retrieves paginated list of tenant organizations.
* **Path Parameters:** None.
* **Query Parameters:** `page`, `limit`, `status`, `search`.
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "tenantId": "tnt_01h9...",
        "name": "Grand Hotel & Resort",
        "code": "GRAND_HOTEL",
        "status": "ACTIVE",
        "createdAt": "2026-01-10T12:00:00Z"
      }
    ],
    "meta": { "pagination": { "page": 1, "limit": 20, "totalElements": 1, "totalPages": 1 } }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `401 Unauthorized`, `403 Forbidden`.
* **Error Responses:** `PERMISSION_DENIED`.
* **Validation Rules:** SuperAdmin role required.

---

### 2. Create Tenant

* **Method:** `POST`
* **Route:** `/api/v1/tenants`
* **Description:** Provisions a new tenant organization.
* **Path Parameters:** None.
* **Query Parameters:** None.
* **Request Body:**
  ```json
  {
    "name": "Grand Hotel & Resort",
    "code": "GRAND_HOTEL",
    "contactEmail": "admin@grandhotel.com"
  }
  ```
* **Response Body (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "tenantId": "tnt_01h9...",
      "name": "Grand Hotel & Resort",
      "code": "GRAND_HOTEL",
      "status": "PROVISIONING",
      "createdAt": "2026-07-31T09:45:00Z"
    }
  }
  ```
* **HTTP Status Codes:** `201 Created`, `400 Bad Request`, `409 Conflict`.
* **Error Responses:** `TENANT_CODE_EXISTS`.
* **Validation Rules:**
  - `name`: Non-empty string, max 100 chars.
  - `code`: Unique alphanumeric identifier, uppercase.
  - `contactEmail`: Valid email string.

---

### 3. Get Tenant Details

* **Method:** `GET`
* **Route:** `/api/v1/tenants/{tenantId}`
* **Description:** Fetches detailed record of a specific tenant.
* **Path Parameters:** `tenantId` (UUID string).
* **Query Parameters:** None.
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "tenantId": "tnt_01h9...",
      "name": "Grand Hotel & Resort",
      "code": "GRAND_HOTEL",
      "status": "ACTIVE",
      "contactEmail": "admin@grandhotel.com"
    }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `404 Not Found`.
* **Error Responses:** `RESOURCE_NOT_FOUND`.
* **Validation Rules:** Must match authenticated tenant scope unless SuperAdmin.
