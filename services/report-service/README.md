# Report Service (`services/report-service`)

## Responsibility

The `report-service` provides analytics aggregation, time-series data querying, and automated report generation for VisionOS users.

## Boundaries & Capabilities

- **Analytical Aggregations**: Rollup queries for detection frequencies, peak activity hours, dwell times, and anomaly counts.
- **Scheduled Report Generation**: Automated creation of PDF, CSV, and XLSX summary reports on daily, weekly, or monthly cadences.
- **Export Engine**: Asynchronous job queue for heavy dataset exports without impacting transactional database performance.
- **Custom BI Datasets**: Exposes formatted data endpoints for external Business Intelligence (PowerBI, Tableau) tools.

## Dependencies & Shared Libraries

- Imports report schema contracts and metric definitions from `@visionos/shared`.
- Consumes historical data stored by `pipeline-service` and `erp-service`.
