# Notification Service (`services/notification-service`)

## Responsibility

The `notification-service` is an event-driven multi-channel messaging service responsible for broadcasting real-time alerts, system logs, and scheduled updates.

## Boundaries & Capabilities

- **WebSocket Live Gateway**: Maintains persistent WebSocket connections for real-time alert pushes to `admin-dashboard` and `customer-dashboard`.
- **Multi-Channel Dispatcher**: Sends notifications across Webhooks, Email (SMTP/SES), Push Notifications (FCM/APNS), and SMS (Twilio).
- **Notification Preferences & Throttling**: Enforces tenant alert routing rules, escalation chains, and rate limiting to prevent alert fatigue.
- **Delivery Audit Logs**: Records delivery receipts, retry attempts, and bounce failures.

## Dependencies & Shared Libraries

- Imports notification payload contracts and channel definitions from `@visionos/shared`.
- Consumes real-time event topics published by `pipeline-service` and `erp-service`.
