# Alert API Specification

## Purpose
Manages life-safety and operational incident alerts, operator acknowledgment, dismissal, and status escalation workflows.

## Base Route
`/api/v1/alerts`

## Authentication
`Bearer JWT` (RS256)

## Authorization (RBAC)
- Read: `Viewer`, `Operator`, `TenantAdmin`, `SuperAdmin`.
- Acknowledge/Resolve: `Operator`, `TenantAdmin`.

---

## Endpoints

### 1. List Incident Alerts (Filtered & Paginated)

* **Method:** `GET`
* **Route:** `/api/v1/alerts`
* **Description:** Retrieves incident alerts filtered by severity, status, date ranges, and site location.
* **Path Parameters:** None.
* **Query Parameters:**
  - `page` (int, default: 1)
  - `limit` (int, default: 20, max: 100)
  - `status` (string: `ACTIVE`, `ACKNOWLEDGED`, `DISMISSED`, `RESOLVED`)
  - `severity` (string: `INFO`, `WARNING`, `CRITICAL`, `LIFE_SAFETY`)
  - `siteId` (string)
  - `startDate` (ISO 8601 UTC string)
  - `endDate` (ISO 8601 UTC string)
  - `sort` (string, default: `createdAt:desc`)
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "alertId": "alt_01h9...",
        "eventId": "evt_01h9...",
        "ruleId": "rul_01h9...",
        "severity": "LIFE_SAFETY",
        "status": "ACTIVE",
        "title": "Drowning Hazard Detected",
        "message": "Stationary body submerged in Children Deep Water Zone > 15 seconds",
        "snapshotUrl": "https://cdn.visionos.ai/snapshots/evt_01h9.jpg",
        "createdAt": "2026-07-31T09:45:00Z"
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
      "requestId": "req_88776655"
    }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `400 Bad Request`, `401 Unauthorized`.
* **Error Responses:** `UNAUTHENTICATED`.
* **Validation Rules:** Tenant scope enforced.

---

### 2. Acknowledge Alert

* **Method:** `POST`
* **Route:** `/api/v1/alerts/{alertId}/acknowledge`
* **Description:** Marks an active alert as acknowledged by an operator identity.
* **Path Parameters:** `alertId` (string).
* **Query Parameters:** None.
* **Request Body:**
  ```json
  {
    "note": "Lifeguard dispatched to pool deck"
  }
  ```
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "alertId": "alt_01h9...",
      "status": "ACKNOWLEDGED",
      "acknowledgedBy": "usr_01h9...",
      "acknowledgedAt": "2026-07-31T09:45:10Z"
    }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `404 Not Found`, `409 Conflict`.
* **Error Responses:** `ALERT_ALREADY_RESOLVED`.
* **Validation Rules:** Operator or TenantAdmin role required.
