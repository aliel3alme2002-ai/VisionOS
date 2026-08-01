# VisionOS OpenAPI Specification Strategy

This document outlines how the future OpenAPI 3.0 (Swagger) specification for VisionOS will be structured once schema generation is executed.

---

## Modular File Structure

Future OpenAPI YAML/JSON definitions will be organized under `docs/api/openapi/`:

```
docs/api/openapi/
├── openapi.yaml                 # Root OpenAPI 3.0 specification entrypoint
├── components/
│   ├── schemas/                 # Shared data model schemas (Tenant, Camera, Event, Alert)
│   ├── security/                # Bearer JWT security scheme definitions
│   ├── responses/               # Standard 400, 401, 403, 404, 500 response components
│   └── parameters/              # Pagination and filtering query parameter schemas
└── paths/
    ├── auth.yaml
    ├── tenants.yaml
    ├── users.yaml
    ├── sites.yaml
    ├── cameras.yaml
    ├── events.yaml
    └── alerts.yaml
```

---

## Tooling & Generation Workflow

- Contracts in `packages/contracts` will automatically validate against these OpenAPI schemas.
- Swagger UI / Redoc will bundle `openapi.yaml` to render live interactive developer documentation.
