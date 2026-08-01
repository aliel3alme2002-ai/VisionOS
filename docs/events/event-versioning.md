# VisionOS Event Versioning Policy

This document defines the schema versioning rules and evolution guidelines for all MQTT events in **VisionOS**.

---

## 1. Version Field Requirement

Every event envelope MUST contain an explicit `eventVersion` integer field:

```json
{
  "eventId": "evt_01h9...",
  "eventType": "vision.event.created",
  "eventVersion": 1,
  "payload": { ... }
}
```

---

## 2. Compatibility Rules

### 2.1 Backward-Compatible Changes (Minor Version Bump)
The following modifications do NOT require bumping the major `eventVersion` integer:
- Adding a new optional key to the `payload` object.
- Extending enum field values with non-breaking additions.

**Subscriber Rule:** All event consumers MUST ignore unknown or unexpected fields in JSON payloads ("Tolerant Reader pattern").

### 2.2 Breaking Changes (Major Version Bump)
The following modifications REQUIRE incrementing `eventVersion` (e.g. `eventVersion: 2`):
- Renaming existing payload keys.
- Removing existing payload keys.
- Changing field data types (e.g. string to integer).

---

## 3. Multi-Version Support Policy

Publishers introducing a major `eventVersion` MUST dual-publish both old and new event versions for a minimum transition period of **90 days** or until all edge nodes are updated.
