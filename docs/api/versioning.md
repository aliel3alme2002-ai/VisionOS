# VisionOS API Versioning & Lifecycle Policy

VisionOS APIs follow strict URL path versioning to ensure 10+ year platform stability and backward compatibility.

---

## 1. Versioning Standard

- All public REST APIs are prefixed with `/api/v1/`.
- Minor, non-breaking schema additions (new optional fields in response JSON) do not bump the API version.
- Breaking schema changes require incrementing the URL path version (e.g. `/api/v2/`).

---

## 2. Deprecation Policy

1. **Deprecation Notice**: Deprecated endpoints return a `Deprecation: true` HTTP header and a `Sunset: <date>` header specifying end-of-life timestamp.
2. **Support Window**: Deprecated API versions are supported for a minimum of 12 months prior to retirement.
