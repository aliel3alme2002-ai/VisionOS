# VisionOS Event Lifecycle & Correlation Propagation

This document details the lifecycle of events across VisionOS and standardizes correlation ID tracing across distributed microservices.

---

## 1. Event Propagation Lifecycle

```
[ IP Camera ] 
      │ (RTSP Video Feed)
      ▼
[ Frigate NVR ] ──► (Generates 'vision.event.created')
      │
      ▼ (MQTT Broker: vision/{tenantId}/{edgeId}/events)
[ Pipeline Service ] ──► (Evaluates Rule thresholds)
      │
      ├───────────────────────────────┐
      ▼ (Sub-100ms Local Override)    ▼ (Generates 'vision.alert.created')
[ Local Strobe Siren Relay ]   [ Notification Service ]
                                      │
                                      ├───────────────┬───────────────┐
                                      ▼               ▼               ▼
                                 [ Push FCM ]    [ SMS Twilio ]  [ WebSocket ]
```

---

## 2. Correlation Header Tracing Standard

To enable distributed tracing across asynchronous message boundaries, every event MUST preserve and propagate three context headers:

### Header Definitions
1. `X-Request-ID` (`requestId`): Identifies the initial HTTP request or client trigger that originated the transaction chain.
2. `X-Correlation-ID` (`correlationId`): Identifies the entire end-to-end business workflow across edge boxes, MQTT brokers, pipeline workers, and notification services.
3. `X-Trace-ID` (`traceId`): OpenTelemetry W3C trace parent header format (`00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01`).

---

## 3. Propagation Protocol Rules

1. **Origin Generation**: If an incoming client HTTP request or Edge frame detection lacks a `correlationId`, the edge worker MUST generate a new UUIDv4 string.
2. **Immutability**: Microservices consuming an MQTT event MUST copy the original `correlationId` into all downstream events produced as a result.
3. **Audit Trail**: All log output emitted during event processing MUST include `[tenantId, edgeId, correlationId]` in log context metadata.
