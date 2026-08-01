# Shared UI Library (`packages/ui`)

## Responsibility

The `@visionos/ui` package contains the design system tokens, reusable UI components, and video display primitives used across `admin-dashboard` and `customer-dashboard`.

## Components & Modules

- **Design System Tokens**: Color palettes, typography rules, spacing units, and dark mode theme definitions.
- **Base UI Primitives**: Buttons, Modals, Tables, Forms, Badges, and Navigation bars.
- **Domain Video Components**: Video player canvas wrapper, bounding box overlay overlays, timeline scrubbers, and RTSP stream state indicators.
- **Analytics Charts**: Reusable chart wrappers for temporal event histograms and footfall metrics.

## Guidelines

- Must enforce accessible, high-performance, responsive component implementations.
- Relies on `@visionos/shared` for domain types (e.g. BoundingBox overlays).
