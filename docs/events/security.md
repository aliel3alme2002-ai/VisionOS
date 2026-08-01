# VisionOS MQTT Security & Authorization Policy

This document defines the security boundaries, authentication mechanisms, and topic access control lists (ACLs) for the Mosquitto MQTT broker infrastructure.

---

## 1. MQTT Authentication

- **mTLS Certificate Authentication**: Edge Boxes authenticate to Mosquitto brokers via X.509 client certificates issued by the VisionOS internal PKI.
- **Client Identifier Enforcement**: Client ID MUST match `edg_<hardwareId>`. Mismatched client IDs are rejected during connection handshake.

---

## 2. Topic Authorization & ACL Rules (Tenant Isolation)

Mosquitto enforces Access Control Lists (ACLs) based on authenticated client certificate CN attributes.

### ACL Rules Matrix

```ini
# Edge Box ACL Rule Template
user edg_{edgeId}

# Permit Edge Box to publish only to its own tenant & node topics
pattern write vision/%u/{edgeId}/#

# Permit Edge Box to read system licenses and its own tenant topics
pattern read vision/%u/{edgeId}/#
pattern read vision/system/licenses

# Deny access to other tenant hierarchies
pattern readwrite vision/+/#
```

---

## 3. Security Principles

1. **Strict Tenant Isolation**: Edge nodes assigned to Tenant A can NEVER read or write messages under `vision/tnt_B/...` topic structures. Attempted cross-tenant access triggers an immediate security alert and revokes the edge certificate.
2. **Least Privilege**: Microservices consume only the minimal topic patterns required for their specific domain (e.g. `notification-service` subscribes strictly to `vision/+/+/alerts`).
3. **Payload Confidentiality**: Sensitive payload attributes (RTSP passwords, tokens) MUST be encrypted using AES-256-GCM before publishing to MQTT message buses.
