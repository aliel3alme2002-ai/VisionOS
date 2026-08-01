# User API Specification

## Purpose
Manages tenant users, profile updates, and RBAC role assignments.

## Base Route
`/api/v1/users`

## Authentication
`Bearer JWT` (RS256)

## Authorization (RBAC)
- Require `TenantAdmin` or `SuperAdmin` role for user management endpoints.

---

## Endpoints

### 1. List Users

* **Method:** `GET`
* **Route:** `/api/v1/users`
* **Description:** Retrieves paginated list of users scoped to current tenant.
* **Path Parameters:** None.
* **Query Parameters:** `page`, `limit`, `role`, `search`.
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "userId": "usr_01h9...",
        "email": "operator@resort.com",
        "fullName": "Security Operator",
        "role": "Operator",
        "status": "ACTIVE"
      }
    ],
    "meta": { "pagination": { "page": 1, "limit": 20, "totalElements": 1, "totalPages": 1 } }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `401 Unauthorized`, `403 Forbidden`.
* **Error Responses:** `PERMISSION_DENIED`.
* **Validation Rules:** Tenant scoped.

---

### 2. Create User

* **Method:** `POST`
* **Route:** `/api/v1/users`
* **Description:** Creates a new user in the authenticated tenant.
* **Path Parameters:** None.
* **Query Parameters:** None.
* **Request Body:**
  ```json
  {
    "email": "operator@resort.com",
    "password": "TempPassword123!",
    "fullName": "Security Operator",
    "role": "Operator",
    "phoneNumber": "+1234567890"
  }
  ```
* **Response Body (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "userId": "usr_01h9...",
      "email": "operator@resort.com",
      "fullName": "Security Operator",
      "role": "Operator",
      "status": "ACTIVE"
    }
  }
  ```
* **HTTP Status Codes:** `201 Created`, `400 Bad Request`, `409 Conflict`.
* **Error Responses:** `EMAIL_ALREADY_EXISTS`.
* **Validation Rules:** `role` must be one of `TenantAdmin`, `Operator`, `Viewer`.
