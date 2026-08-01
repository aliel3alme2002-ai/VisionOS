# VisionOS API Pagination Specification

All collection GET endpoints in VisionOS use standardized 1-based offset/limit query parameters.

---

## Query Parameters

| Parameter | Type | Default | Max | Description |
| :--- | :--- | :---: | :---: | :--- |
| `page` | Integer | `1` | N/A | 1-based page number index. |
| `limit` | Integer | `20` | `100` | Number of items returned per page. |

---

## Response Envelope Structure

```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalElements": 142,
      "totalPages": 8,
      "hasNextPage": true,
      "hasPreviousPage": false
    },
    "timestamp": "2026-07-31T09:45:00Z",
    "requestId": "req_8f9a2b1c"
  }
}
```
