# VisionOS Business Domain Model Specification

This directory contains the official Business Domain Model for **VisionOS**.

## Contents

- [Domain Model Specification](file:///E:/VisionOS/docs/domain/domain-model.md): Detailed specifications for all 14 core domain entities.
- [Domain Diagram & Relationships](file:///E:/VisionOS/docs/domain/domain-diagram.md): Mermaid ER diagram, relationship cardinalities, and ownership hierarchy.

## Core Entities Overview

| Entity | Domain Category | Description |
| :--- | :--- | :--- |
| **Tenant** | Organization | Top-level enterprise customer account providing complete data isolation. |
| **User** | Identity & Access | Platform operator, administrator, or viewer within a tenant organization. |
| **Site** | Spatial Hierarchy | Physical facility or property (e.g. hotel, warehouse, factory). |
| **Building** | Spatial Hierarchy | Structural building within a physical site. |
| **Floor** | Spatial Hierarchy | Level or story within a building structure. |
| **Zone** | Spatial Boundary | Defined Region of Interest (ROI) on a camera feed or physical floor. |
| **Camera** | Hardware & Vision | Network IP camera capturing RTSP video feeds. |
| **Device** | Hardware & I/O | Peripheral hardware device (IoT sensor, physical alarm siren relay). |
| **Edge Box** | Compute Node | On-premise hardware server executing Frigate, edge AI, and local rules. |
| **Event** | Telemetry & Vision | Raw computer vision observation or hardware state change. |
| **Alert** | Life-Safety & Action | Evaluated incident requiring attention based on system rules. |
| **Rule** | Policy Engine | Condition evaluating events against thresholds to generate alerts. |
| **Notification** | Communication | Multi-channel dispatch (SMS, Email, Push, WebSocket) of an alert. |
| **License** | Entitlement | Cryptographically signed entitlement governing feature flags and camera quotas. |
