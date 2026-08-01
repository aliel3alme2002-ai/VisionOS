# VisionOS Standard API Response Envelopes

All VisionOS REST API endpoints return structured JSON response envelopes.

---

## 1. Single Entity Response Envelope

```json
{
  "success": true,
  "data": {
    "id": "cam_01h9x82...",
    "name": "Pool Camera 01",
    "status": "ONLINE"
  },
  "meta": {
    "timestamp": "2026-07-31T09:45:00Z",
    "requestId": "req_8f9a2b1c"
  }
}
```

---

## 2. Collection Response Envelope (Paginated)

```json
{
  "success": true,
  "data": [
    {
      "id": "cam_01h9x82...",
      "name": "Pool Camera 01"
    }
  ],
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

---

## 3. Error Response Envelope

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Validation failed for request parameters",
    "details": [
      {
        "field": "rtspUrl",
        "issue": "rtspUrl must be a valid RTSP connection URI (e.g. rtsp://...)"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-07-31T09:45:00Z",
    "requestId": "req_8f9a2b1c"
  }
}
```
