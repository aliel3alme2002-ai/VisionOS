# Customer Dashboard (`apps/customer-dashboard`)

## Responsibility

The `customer-dashboard` application is the primary web portal for VisionOS enterprise customers, operators, and end-users.

## Core Features & Boundaries

- **Live Camera Feeds**: View real-time RTSP/WebRTC video streams managed by `camera-service`.
- **AI Alert Feed & Event Player**: Real-time notifications and clip playback for object detection, boundary crossing, and custom AI events.
- **Analytics & Reporting**: Interactive visualization of detection metrics, footfall counting, and custom PDF/CSV export via `report-service`.
- **Billing & Subscriptions**: Account tier management, invoice downloads, and usage tracking via `billing-service`.
- **ERP Settings**: Configuration of ERP sync endpoints via `erp-service`.

## Dependencies

- `@visionos/ui`: UI components, charts, and video player container components.
- `@visionos/sdk`: Type-safe SDK to communicate with backend APIs.
- `@visionos/shared`: Domain types and error representations.
