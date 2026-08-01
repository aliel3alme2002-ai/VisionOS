# VisionOS Dead-Letter Queue (DLQ) Strategy

This document specifies the Dead-Letter Queue routing and recovery mechanics for failed event processing.

---

## 1. Dead-Letter Topic Architecture

When an event message fails after 5 retries or suffers a non-retryable permanent error (e.g. malformed JSON schema), the consumer MUST publish the original message to the tenant's Dead-Letter Queue topic:

```
vision/{tenantId}/{edgeId}/dlq
```

---

## 2. DLQ Wrapper Payload

The message published to the DLQ topic wraps the original unparsed or failed event along with diagnostic error metadata:

```json
{
  "dlqId": "dlq_01h9x82b...",
  "originalTopic": "vision/tnt_01h9/edg_01/events",
  "failedAt": "2026-07-31T09:45:10.500Z",
  "attemptsMade": 5,
  "errorMessage": "JSON validation failed: 'confidence' field expected float, got string",
  "originalMessage": { ... }
}
```

---

## 3. Monitoring & Replay Workflow

1. **DLQ Alerting**: The `notification-service` monitors `vision/+/+/dlq` and notifies platform engineers if DLQ depth > 10 messages.
2. **DLQ Inspector & Replay**: Admin Dashboard provides a Dead-Letter Inspection utility allowing engineers to view malformed payloads, correct schema errors, and replay messages back into primary processing topics.
