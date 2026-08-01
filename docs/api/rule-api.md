# Rule API Specification

## Purpose
Manages vision policy rules, evaluation metrics, thresholds, and ROI zone triggers.

## Base Route
`/api/v1/rules`

## Authentication
`Bearer JWT` (RS256)

## Authorization (RBAC)
- Read: `Viewer`, `Operator`, `TenantAdmin`.
- Write/Delete: `Operator`, `TenantAdmin`.

---

## Endpoints

### 1. List Rules

* **Method:** `GET`
* **Route:** `/api/v1/rules`
* **Description:** Retrieves paginated list of evaluation rules.
* **Path Parameters:** None.
* **Query Parameters:** `zoneId`, `metric`, `isEnabled`, `page`, `limit`.
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "ruleId": "rul_01h9...",
        "zoneId": "zon_01h9...",
        "name": "Pool Drowning Prevention Rule",
        "metric": "dwell_time",
        "operator": "DURATION_EXCEEDS",
        "thresholdValue": 15,
        "debounceSeconds": 30,
        "isEnabled": true
      }
    ],
    "meta": { "pagination": { "page": 1, "limit": 20, "totalElements": 1, "totalPages": 1 } }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `401 Unauthorized`.
* **Error Responses:** `UNAUTHENTICATED`.
* **Validation Rules:** Scoped to tenant.

---

### 2. Create Rule

* **Method:** `POST`
* **Route:** `/api/v1/rules`
* **Description:** Configures a new evaluation rule on a zone.
* **Path Parameters:** None.
* **Query Parameters:** None.
* **Request Body:**
  ```json
  {
    "zoneId": "zon_01h9...",
    "name": "Pool Drowning Prevention Rule",
    "metric": "dwell_time",
    "operator": "DURATION_EXCEEDS",
    "thresholdValue": 15,
    "debounceSeconds": 30
  }
  ```
* **Response Body (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "ruleId": "rul_01h9...",
      "zoneId": "zon_01h9...",
      "name": "Pool Drowning Prevention Rule",
      "isEnabled": true
    }
  }
  ```
* **HTTP Status Codes:** `201 Created`, `400 Bad Request`.
* **Error Responses:** `INVALID_RULE_OPERATOR`.
* **Validation Rules:** `operator` must be one of `GREATER_THAN`, `LESS_THAN`, `EQUALS`, `DURATION_EXCEEDS`.
