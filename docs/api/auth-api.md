# Auth API Specification

## Purpose
Provides user authentication, token refresh, session revocation, and current user profile endpoints for VisionOS.

## Base Route
`/api/v1/auth`

## Authentication
- `POST /login`, `POST /refresh`: Public (No token required).
- All other endpoints: `Bearer JWT` required.

## Authorization (RBAC)
- All authenticated users can access `/me` and `/logout`.

---

## Endpoints

### 1. User Login

* **Method:** `POST`
* **Route:** `/api/v1/auth/login`
* **Description:** Authenticates user credentials and issues an RS256 signed Access Token and HTTP-Only Refresh Cookie.
* **Path Parameters:** None.
* **Query Parameters:** None.
* **Request Body:**
  ```json
  {
    "email": "admin@resort.com",
    "password": "SecurePassword123!"
  }
  ```
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "accessToken": "eyJhbGciOiJSUzI1NiIs...",
      "tokenType": "Bearer",
      "expiresIn": 900,
      "user": {
        "userId": "usr_01h9...",
        "tenantId": "tnt_01h9...",
        "email": "admin@resort.com",
        "role": "TenantAdmin"
      }
    }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `400 Bad Request`, `401 Unauthorized`.
* **Error Responses:** `INVALID_CREDENTIALS`, `ACCOUNT_LOCKED`.
* **Validation Rules:**
  - `email`: Must be valid email format.
  - `password`: Must be string, min 8 characters.

---

### 2. Refresh Access Token

* **Method:** `POST`
* **Route:** `/api/v1/auth/refresh`
* **Description:** Exchanges valid HttpOnly refresh cookie for new RS256 access token.
* **Path Parameters:** None.
* **Query Parameters:** None.
* **Request Body:** None (uses HttpOnly cookie `refreshToken`).
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "accessToken": "eyJhbGciOiJSUzI1NiIs...",
      "expiresIn": 900
    }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `401 Unauthorized`.
* **Error Responses:** `INVALID_REFRESH_TOKEN`, `TOKEN_EXPIRED`.
* **Validation Rules:** Valid refresh token required in cookie.

---

### 3. Get Current User Profile

* **Method:** `GET`
* **Route:** `/api/v1/auth/me`
* **Description:** Returns profile and permission scopes of currently authenticated user.
* **Path Parameters:** None.
* **Query Parameters:** None.
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "userId": "usr_01h9...",
      "tenantId": "tnt_01h9...",
      "email": "admin@resort.com",
      "fullName": "System Admin",
      "role": "TenantAdmin",
      "permissions": ["camera:read", "camera:write", "alert:read", "alert:dismiss"]
    }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `401 Unauthorized`.
* **Error Responses:** `UNAUTHENTICATED`.
* **Validation Rules:** Valid Bearer JWT required.
