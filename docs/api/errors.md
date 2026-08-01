# VisionOS Error Handling & Status Codes

VisionOS APIs return standard HTTP status codes combined with structured error payloads.

---

## Standard Error Response Structure

```json
{
  "success": false,
  "error": {
    "code": "CAMERA_LIMIT_EXCEEDED",
    "message": "Tenant license camera limit reached (10/10 active cameras)",
    "details": []
  },
  "meta": {
    "timestamp": "2026-07-31T09:45:00Z",
    "requestId": "req_10293847"
  }
}
```

---

## HTTP Status Code Mapping

| Status Code | Code Name | Description |
| :--- | :--- | :--- |
| **200 OK** | Success | Request succeeded. |
| **201 Created** | Created | Resource successfully created. |
| **204 No Content** | No Content | Action succeeded with no body returned. |
| **400 Bad Request** | `INVALID_INPUT` | Syntax error or failed validation rules. |
| **401 Unauthorized** | `UNAUTHENTICATED` | Missing or invalid Bearer JWT. |
| **403 Forbidden** | `PERMISSION_DENIED` | Valid JWT but lacking required RBAC permissions. |
| **404 Not Found** | `RESOURCE_NOT_FOUND` | Target entity does not exist or outside tenant scope. |
| **409 Conflict** | `RESOURCE_EXISTS` | Unique constraint collision (e.g. duplicate camera RTSP URL). |
| **422 Unprocessable** | `LICENSE_EXCEEDED` | Business domain policy failure (e.g. license camera cap reached). |
| **429 Too Many Req** | `RATE_LIMITED` | API quota exceeded. |
| **500 Internal Error**| `INTERNAL_ERROR` | Unexpected backend error. |

---

## Standard System Error Codes

- `UNAUTHENTICATED`: Missing or expired Bearer token.
- `TOKEN_EXPIRED`: JWT token lifetime exceeded.
- `PERMISSION_DENIED`: Lacks RBAC privilege.
- `TENANT_MISMATCH`: Attempting access across tenant boundary.
- `RESOURCE_NOT_FOUND`: Entity ID not found.
- `LICENSE_EXPIRED`: License entitlement expired.
- `LICENSE_LIMIT_EXCEEDED`: Exceeded active camera/device quotas.
- `HARDWARE_LOCK_FAILED`: Edge HWID signature validation failed.
