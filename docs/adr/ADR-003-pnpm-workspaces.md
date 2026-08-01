# ADR-003: Workspace Standard — pnpm Workspaces

* **Status:** Accepted
* **Date:** 2026-07-31
* **Deciders:** VisionOS Architecture Team

---

## 1. Context

Managing a monorepo with multiple packages (`packages/contracts`, `packages/config`, `packages/sdk`, `packages/ui`), services, and applications requires a fast, reliable package manager supporting workspace symlinking, strict dependency isolation, and reproducible builds.

npm workspaces, yarn, and Turborepo orchestrators were evaluated.

---

## 2. Decision

VisionOS standardizes strictly on **pnpm Workspaces** (`pnpm@9.15.4`) configured via `pnpm-workspace.yaml`.

Turborepo and npm workspaces are explicitly excluded for the MVP phase.

---

## 3. Consequences

### Positive
* **Content-Addressable Store:** Saves disk space and accelerates package installation via global hard-linking.
* **Strict Dependency Tree:** Prevents access to unlisted transitive dependencies ("phantom dependencies"), ensuring builds fail fast if dependencies are missing in `package.json`.
* **Workspace Protocol (`workspace:*`):** Simplifies internal package linking across `apps/`, `services/`, and `packages/`.

### Tradeoffs / Negative
* All developers and CI build runners must use `pnpm` as the designated package manager.
