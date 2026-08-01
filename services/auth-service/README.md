# Auth Service (`services/auth-service`)

## Responsibility

The `auth-service` manages identity, authentication, session state, access control policies, and security tokens for VisionOS.

## Boundaries & Capabilities

- **User Authentication**: Login, logout, multi-factor authentication (MFA), OAuth2/OIDC single sign-on.
- **Token Management**: Issuance, validation, and revocation of JWT access tokens and refresh tokens.
- **Role-Based Access Control (RBAC)**: Fine-grained permission evaluations across tenants, organizations, and resource groups.
- **API Key Management**: Provisioning and scope validation of API keys used by external client applications and SDKs.

## Dependencies & Shared Libraries

- Imports domain schemas and authorization contracts from `@visionos/shared`.
- Interacts with `license-service` to verify active account permissions.
