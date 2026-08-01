# Packages Directory

The `packages/` directory contains internal, reusable packages and libraries shared across applications and microservices in the VisionOS monorepo.

## Workspace Packages

- **[`packages/shared`](./shared/README.md)**: Universal TypeScript types, domain interfaces, error constants, and validation schemas.
- **[`packages/sdk`](./sdk/README.md)**: Strongly-typed JavaScript/TypeScript API client library for consuming VisionOS backend microservices.
- **[`packages/ui`](./ui/README.md)**: Shared React/Web component library, layout primitives, and design system tokens.

## Monorepo Publishing & Versioning Guidelines

- **Internal Workspace Dependencies**: Packages in this directory use `workspace:*` dependency protocol for seamless cross-package linking.
- **No Circular Dependencies**: `shared` must remain a leaf dependency with zero internal monorepo imports. `sdk` depends on `shared`. `ui` depends on `shared`.
- **Zero Business Logic**: Packages must contain pure utilities, UI elements, or SDK clients. Do not place microservice domain execution logic inside `packages/`.
