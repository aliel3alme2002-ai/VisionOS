# Notification API Specification

## Purpose
Manages multi-channel event notification dispatches (SMS, Email, Push, WebSocket), delivery logs, and recipient channels.

## Base Route
`/api/v1/notifications`

## Authentication
`Bearer JWT` (RS256)

## Authorization (RBAC)
- Read: `Viewer`, `Operator`, `TenantAdmin`.
- Retry/Dispatch: `Operator`, `TenantAdmin`.

---

## Endpoints

### 1. List Notification Dispatches (Filtered & Paginated)

* **Method:** `GET`
* **Route:** `/api/v1/notifications`
* **Description:** Retrieves paginated notification audit logs with channel, status, date range, and tenant filtering.
* **Path Parameters:** None.
* **Query Parameters:**
  - `page` (int, default: 1)
  - `limit` (int, default: 20, max: 100)
  - `channel` (string: `WEBSOCKET`, `SMS`, `EMAIL`, `PUSH`)
  - `status` (string: `PENDING`, `SENT`, `FAILED`)
  - `alertId` (string)
  - `userId` (string)
  - `startDate` (ISO 8601 UTC string)
  - `endDate` (ISO 8601 UTC string)
  - `sort` (string, default: `sentAt:desc`)
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "notificationId": "ntf_01h9...",
        "alertId": "alt_01h9...",
        "userId": "usr_01h9...",
        "channel": "SMS",
        "status": "SENT",
        "sentAt": "2026-07-31T09:45:05Z"
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
      "requestId": "req_99887766"
    }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `401 Unauthorized`.
* **Error Responses:** `UNAUTHENTICATED`.
* **Validation Rules:** Tenant scope enforced.

---

### 2. Retry Failed Notification Dispatch

* **Method:** `POST`
* **Route:** `/api/v1/notifications/{notificationId}/retry`
* **Description:** Re-queues a failed SMS or Email dispatch attempt.
* **Path Parameters:** `notificationId` (string).
* **Query Parameters:** None.
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "notificationId": "ntf_01h9...",
      "status": "PENDING"
    }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `404 Not Found`.
* **Error Responses:** `NOTIFICATION_NOT_FAILED`.
* **Validation Rules:** Only notifications in `FAILED` state can be retried.
