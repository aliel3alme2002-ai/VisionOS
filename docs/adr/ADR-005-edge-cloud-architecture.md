# ADR-005: Hybrid Edge-Cloud Distributed Architecture

* **Status:** Accepted
* **Date:** 2026-07-31
* **Deciders:** VisionOS Architecture Team

---

## 1. Context

VisionOS monitors safety-critical commercial environments (e.g. swimming pool drowning prevention, perimeter intrusion). These environments require:
1. **Sub-second alert latency (<1,000ms)** for life-safety events.
2. **Autonomous offline operation**: Local recording, AI inference, and physical siren triggers must operate continuously even if the facility loses cloud internet connectivity.
3. **Centralized Enterprise Management**: Multi-tenant administration, long-term analytics, ERP synchronizations, and multi-channel notifications (SMS/Email/Push) require centralized cloud aggregation.

---

## 2. Decision

VisionOS will adopt a **Distributed Hybrid Edge-Cloud Architecture**:

* **Edge Box (On-Premise)**:
  - Ingests local RTSP camera feeds via Frigate NVR.
  - Executes local motion gating and deep learning inference (`ai-custom-service`).
  - Evaluates immediate ROI safety rules and triggers local physical alarm relays (sub-100ms).
  - Maintains 7-day local event buffer.

* **Cloud Control Plane**:
  - Centralized multi-tenant user authentication, RBAC, and licensing.
  - Aggregate time-series event metrics and reporting.
  - Multi-channel notification routing (SMS, Email, Push).
  - External ERP system synchronization adapters (SAP, Odoo, QuickBooks).

---

## 3. Consequences

### Positive
* **Life-Safety Resiliency:** Local Edge Box functions autonomously during cloud internet outages; critical safety alerts dispatch locally without WAN dependence.
* **Bandwidth Optimization:** Continuous high-bitrate RTSP video streams stay local on the facility LAN; only lightweight event metadata payloads are uploaded to the cloud.
* **Scalable Control Plane:** Central cloud platform manages thousands of distributed Edge Boxes under a single multi-tenant pane of glass.

### Tradeoffs / Negative
* Requires implementing edge-cloud sync retry queues and offline state reconciliation when internet connectivity restores.
