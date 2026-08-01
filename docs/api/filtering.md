# VisionOS Filtering & Sorting Specification

All collection GET endpoints support consistent filtering, sorting, and date range parameters.

---

## 1. Filtering Format

Field-level query parameters filter collection items:

```http
GET /api/v1/events?eventType=DROWNING_ALERT&status=ACTIVE&siteId=site_01
```

---

## 2. Date Range Filtering

Use ISO 8601 UTC timestamp parameters `startDate` and `endDate`:

```http
GET /api/v1/events?startDate=2026-07-01T00:00:00Z&endDate=2026-07-31T23:59:59Z
```

---

## 3. Sorting Standard

Use the `sort` query parameter formatted as `fieldName:asc` or `fieldName:desc`. Multiple sort fields can be comma-separated:

```http
GET /api/v1/alerts?sort=severity:desc,createdAt:desc
```
