# License API Specification

## Purpose
Manages software entitlement keys, maximum camera quotas, feature flag modules, and HWID activation locks.

## Base Route
`/api/v1/licenses`

## Authentication
`Bearer JWT` (RS256)

## Authorization (RBAC)
- Read: `TenantAdmin`, `SuperAdmin`.
- Create/Revoke: `SuperAdmin`.

---

## Endpoints

### 1. Issue License Key

* **Method:** `POST`
* **Route:** `/api/v1/licenses`
* **Description:** Issues a cryptographically signed RSA-4096 license key for a tenant organization.
* **Path Parameters:** None.
* **Query Parameters:** None.
* **Request Body:**
  ```json
  {
    "tenantId": "tnt_01h9...",
    "maxCameras": 10,
    "enabledModules": ["POOL_SAFETY", "INTRUSION", "OCCUPANCY"],
    "expiresAt": "2027-07-31T23:59:59Z"
  }
  ```
* **Response Body (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "licenseId": "lic_01h9...",
      "tenantId": "tnt_01h9...",
      "licenseKey": "eyJhbGciOiJSUzQwOTYiLC...",
      "maxCameras": 10,
      "status": "ACTIVE"
    }
  }
  ```
* **HTTP Status Codes:** `201 Created`, `400 Bad Request`, `403 Forbidden`.
* **Error Responses:** `PERMISSION_DENIED`.
* **Validation Rules:** SuperAdmin role required. `maxCameras` integer > 0.

---

### 2. Get Active License Entitlements

* **Method:** `GET`
* **Route:** `/api/v1/licenses/current`
* **Description:** Retrieves currently active license entitlements, camera quota usage, and module flags.
* **Path Parameters:** None.
* **Query Parameters:** None.
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "tenantId": "tnt_01h9...",
      "maxCameras": 10,
      "activeCameras": 4,
      "enabledModules": ["POOL_SAFETY", "INTRUSION", "OCCUPANCY"],
      "expiresAt": "2027-07-31T23:59:59Z",
      "status": "ACTIVE"
    }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `401 Unauthorized`.
* **Error Responses:** `NO_ACTIVE_LICENSE`.
* **Validation Rules:** Tenant scope enforced.
