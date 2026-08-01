# Billing Service (`services/billing-service`)

## Responsibility

The `billing-service` manages customer subscription lifecycles, usage-based metering, payment processing, and invoice generation.

## Boundaries & Capabilities

- **Subscription Lifecycle**: Tier upgrades, downgrades, cancellations, and trial management.
- **Payment Gateway Integrations**: Connectors for Stripe, PayPal, and enterprise direct invoicing.
- **Usage Metering**: Aggregates billable metrics (active camera stream count, retention gigabytes, AI model inference hours).
- **Invoice Generation**: Automated generation of monthly/annual PDF invoices and tax receipts.

## Dependencies & Shared Libraries

- Imports billing schemas, invoice DTOs, and currency models from `@visionos/shared`.
- Synchronizes subscription state changes with `license-service`.
