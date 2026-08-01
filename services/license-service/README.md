# License Service (`services/license-service`)

## Responsibility

The `license-service` manages enterprise software licensing, feature entitlements, usage quotas, and offline license key validation for VisionOS installations.

## Boundaries & Capabilities

- **License Key Provisioning**: Generation, cryptographic signing, and verification of online and air-gapped offline license files.
- **Entitlement Enforcement**: Verification of max active camera streams, allowed custom AI model counts, and retention windows per tenant.
- **Heartbeat & Telemetry Verification**: Validates periodic node telemetry to prevent unlicensed deployment scaling.
- **Grace Period Management**: Manages subscription expiration warnings and feature degradation workflows.

## Dependencies & Shared Libraries

- Imports license signature schemas and entitlement definitions from `@visionos/shared`.
- Integrates with `billing-service` to activate or modify license tiers upon payment events.
