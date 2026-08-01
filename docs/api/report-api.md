# Report API Specification

## Purpose
Provides analytics rollup queries, footfall trends, heatmaps, and background PDF/CSV export generation.

## Base Route
`/api/v1/reports`

## Authentication
`Bearer JWT` (RS256)

## Authorization (RBAC)
- Read/Export: `Viewer`, `Operator`, `TenantAdmin`.

---

## Endpoints

### 1. Get Occupancy Rollup Analytics

* **Method:** `GET`
* **Route:** `/api/v1/reports/occupancy`
* **Description:** Retrieves aggregated time-series footfall and occupancy metrics.
* **Path Parameters:** None.
* **Query Parameters:** `siteId`, `zoneId`, `startDate`, `endDate`, `interval` (`hourly`, `daily`).
* **Request Body:** None.
* **Response Body (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "metric": "occupancy",
      "interval": "hourly",
      "series": [
        { "timestamp": "2026-07-31T08:00:00Z", "avgOccupancy": 12, "peakOccupancy": 24 },
        { "timestamp": "2026-07-31T09:00:00Z", "avgOccupancy": 18, "peakOccupancy": 31 }
      ]
    }
  }
  ```
* **HTTP Status Codes:** `200 OK`, `400 Bad Request`.
* **Error Responses:** `INVALID_DATE_RANGE`.
* **Validation Rules:** `startDate` and `endDate` required.

---

### 2. Export Incident Log (PDF/CSV)

* **Method:** `POST`
* **Route:** `/api/v1/reports/export`
* **Description:** Generates asynchronous downloadable PDF/CSV audit reports.
* **Path Parameters:** None.
* **Query Parameters:** None.
* **Request Body:**
  ```json
  {
    "format": "PDF",
    "reportType": "INCIDENT_LOG",
    "startDate": "2026-07-01T00:00:00Z",
    "endDate": "2026-07-31T23:59:59Z"
  }
  ```
* **Response Body (202 Accepted):**
  ```json
  {
    "success": true,
    "data": {
      "reportJobId": "job_01h9...",
      "status": "PROCESSING",
      "downloadUrl": null
    }
  }
  ```
* **HTTP Status Codes:** `202 Accepted`, `400 Bad Request`.
* **Error Responses:** `UNSUPPORTED_FORMAT`.
* **Validation Rules:** `format` must be `PDF` or `CSV`.
