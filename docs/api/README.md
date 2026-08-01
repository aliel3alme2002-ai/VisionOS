# VisionOS REST API Specification (v1)

Welcome to the official contract-first API specification for **VisionOS**.

---

## Architecture Principles
1. **REST Protocol**: JSON payloads over HTTPS. Base URL prefix `/api/v1/`.
2. **Multi-Tenant Isolation**: Tenant scoping strictly enforced via JWT claims and database RLS.
3. **Stateless Authentication**: Short-lived RS256 signed JWT access tokens (15m) + refresh token cookies.
4. **Predictable Responses**: Uniform envelope structure for success, pagination, and error responses.

---

## Specification Directory

### Common Standards
- [Common Response Envelopes](file:///E:/VisionOS/docs/api/common-responses.md)
- [Error Handling & Code Catalog](file:///E:/VisionOS/docs/api/errors.md)
- [Pagination Specification](file:///E:/VisionOS/docs/api/pagination.md)
- [Filtering & Sorting Specification](file:///E:/VisionOS/docs/api/filtering.md)
- [API Versioning & Lifecycle Policy](file:///E:/VisionOS/docs/api/versioning.md)
- [OpenAPI Organization Overview](file:///E:/VisionOS/docs/api/openapi-overview.md)

---

### Domain API Specifications

| Domain API | Base Route | Description |
| :--- | :--- | :--- |
| [Auth API](file:///E:/VisionOS/docs/api/auth-api.md) | `/api/v1/auth` | Login, token refresh, logout, session state |
| [Tenant API](file:///E:/VisionOS/docs/api/tenant-api.md) | `/api/v1/tenants` | Enterprise customer provisioning & administration |
| [User API](file:///E:/VisionOS/docs/api/user-api.md) | `/api/v1/users` | User management & RBAC assignments |
| [Site API](file:///E:/VisionOS/docs/api/site-api.md) | `/api/v1/sites` | Physical facility & location management |
| [Building API](file:///E:/VisionOS/docs/api/building-api.md) | `/api/v1/buildings` | Architectural building management |
| [Floor API](file:///E:/VisionOS/docs/api/floors-api.md) | `/api/v1/floors` | Elevation & floorplan asset management |
| [Zone API](file:///E:/VisionOS/docs/api/zone-api.md) | `/api/v1/zones` | Region of Interest (ROI) polygon management |
| [Camera API](file:///E:/VisionOS/docs/api/camera-api.md) | `/api/v1/cameras` | IP camera RTSP ingestion & stream management |
| [Device API](file:///E:/VisionOS/docs/api/device-api.md) | `/api/v1/devices` | Peripheral IoT hardware & relay management |
| [Edge API](file:///E:/VisionOS/docs/api/edge-api.md) | `/api/v1/edge-boxes` | Edge Box hardware registration & telemetry |
| [Event API](file:///E:/VisionOS/docs/api/event-api.md) | `/api/v1/events` | Computer vision & sensor event logs |
| [Alert API](file:///E:/VisionOS/docs/api/alert-api.md) | `/api/v1/alerts` | Life-safety & operational alert workflows |
| [Rule API](file:///E:/VisionOS/docs/api/rule-api.md) | `/api/v1/rules` | Policy evaluation thresholds & ROI rules |
| [Notification API](file:///E:/VisionOS/docs/api/notification-api.md) | `/api/v1/notifications` | Multi-channel dispatch routing (SMS/Push/WS) |
| [License API](file:///E:/VisionOS/docs/api/license-api.md) | `/api/v1/licenses` | Entitlement keys & HWID activation lock |
| [Report API](file:///E:/VisionOS/docs/api/report-api.md) | `/api/v1/reports` | Analytics rollups & PDF/CSV export engine |
