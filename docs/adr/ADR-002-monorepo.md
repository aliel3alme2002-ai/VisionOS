# ADR-002: Modular Monorepo Architecture Strategy

* **Status:** Accepted
* **Date:** 2026-07-31
* **Deciders:** VisionOS Architecture Team

---

## 1. Context

VisionOS encompasses multiple web application frontends, domain microservices, shared internal utility packages, infrastructure container templates, and documentation specs.

Managing these components in separate git repositories during initial platform development introduces version drift, multi-repository pull request coordination friction, and fragmented tooling.

---

## 2. Decision

VisionOS will be structured as a **Modular Monorepo** containing:

```
visionos/
├── apps/               # Web applications (admin-dashboard, customer-dashboard)
├── services/           # Microservices (auth, erp, license, camera, pipeline, etc.)
├── packages/           # Domain packages (contracts, config, sdk, ui)
├── infra/              # Container topologies (docker, frigate-config)
└── docs/               # Technical specs, architecture records, research sprint
```

**MVP Execution Profile:**
While service boundaries are strictly separated in code and packages, the initial MVP deployment on the Edge Box executes as a **modular monolith** running 3 containerized processes:
1. `frigate` (Edge camera ingestion container)
2. `edge-runtime` (Single container bundling local services)
3. `admin-api` (Cloud control plane process)

Actual physical container decomposition into independent microservices occurs when scale demands dictate.

---

## 3. Consequences

### Positive
* **Atomic Commits & PRs:** Code changes across contracts, services, and apps can be made in a single repository commit.
* **Unified Tooling:** Single configuration for TypeScript, ESLint, Prettier, and environment files.
* **Low Initial Overhead:** Monorepo modular monolith deployment model eliminates premature microservice network latency and DevOps complexity.

### Tradeoffs / Negative
* Requires enforcing strict package boundaries to prevent tight coupling across services.
