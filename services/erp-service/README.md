# ERP Integration Service (`services/erp-service`)

## Responsibility

The `erp-service` bridges VisionOS video analytics events and operational data with third-party Enterprise Resource Planning (ERP) systems.

## Boundaries & Capabilities

- **ERP System Connectors**: Standardized connectors for SAP, Odoo, NetSuite, QuickBooks, and generic REST/GraphQL webhooks.
- **Automated Inventory & Asset Events**: Translates detected physical events (e.g. pallet arrival, vehicle license plate detection, warehouse item movement) into ERP transactions.
- **Bi-directional Synchronization**: Syncs master data (employees, inventory SKUs, shift schedules) from customer ERPs to VisionOS.
- **Retry & Event Queuing**: Resilient delivery mechanisms with exponential backoff for external ERP rate limits or outages.

## Dependencies & Shared Libraries

- Imports DTOs and transaction event contracts from `@visionos/shared`.
- Consumes event streams from `pipeline-service` and `notification-service`.
