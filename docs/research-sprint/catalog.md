# Technical Evaluation: Camera & Vision Stack Platforms

## Executive Summary

This document presents a technical evaluation of open-source Network Video Recorder (NVR) and video management platforms to determine the edge camera ingestion and AI detection layer for **VisionOS**. 

The platforms evaluated are:
1. **Frigate NVR**
2. **Shinobi CCTV**
3. **ZoneMinder**

The evaluation analyzes each platform across 12 criteria to establish a production-ready architectural recommendation for VisionOS.

---

## 1. Frigate NVR

### Purpose
Frigate is an open-source NVR designed specifically for local AI-powered object detection. It processes RTSP video streams with minimal overhead using motion detection as a preliminary gate before routing video frames to dedicated hardware AI accelerators.

### Technical Profile

| Criterion | Evaluation & Details |
| :--- | :--- |
| **License** | **MIT License** |
| **Commercial Usage** | **Fully Permitted.** Royalty-free with zero copyleft restrictions. Ideal for enterprise commercial platforms and edge deployments. |
| **GPU Support** | **Extensive.** Supports NVIDIA (CUDA / TensorRT), Intel (OpenVINO / QuickSync / Arc GPUs), AMD (VAAPI / ROCm), and Google Coral Edge TPUs. |
| **MQTT Support** | **Native & First-Class.** Publishes real-time object detection events, camera metrics, motion states, and system statistics to MQTT topics (e.g., `frigate/<camera_name>/events`). |
| **REST API** | **Comprehensive.** Exposes an HTTP REST API and WebSockets (ports 5000 / 8971) backed by OpenAPI/Swagger specifications for stream control, snapshots, clips, and configuration. |
| **ONVIF Support** | **Integrated via `go2rtc`.** Supports ONVIF autodiscovery, stream capability negotiation, and PTZ (Pan-Tilt-Zoom) camera controls. |
| **Docker Support** | **First-Class.** Official container images (`ghcr.io/blakeblackshear/frigate`) maintained with containerized hardware passthrough presets. |
| **Active Community** | **Extremely Active.** Rapid development cadence, extensive documentation at `docs.frigate.video`, and widespread adoption in edge computer vision communities. |
| **Scalability** | **Edge Node Model.** Scalable horizontally by deploying edge node instances per site/facility. Centralized control achieved by subscribing to edge MQTT topics. |

### Advantages
- Ground-up architecture designed for real-time AI object detection.
- Low CPU utilization via motion-gated frame sampling.
- Integrated high-performance video streaming stack (`go2rtc`) supporting WebRTC, MSE, and RTSP re-streaming.
- Permissive MIT license allows embedding within proprietary enterprise platforms.
- Native, structured JSON event payloads over MQTT.

### Disadvantages
- Lacks built-in multi-tenant user management, enterprise RBAC, and billing (intended to run behind an external gateway/orchestrator).
- Cloud-assisted custom model training service (Frigate+) is an optional proprietary SaaS, though local ONNX/TensorRT custom models are supported natively.

### Why We Should or Should Not Use It
- **Why Use It:** It provides the highest AI detection throughput per watt, native MQTT event streams, clean REST APIs, and an unencumbered MIT license that seamlessly fits into VisionOS's edge node architecture (`infra/frigate-config`).
- **Why Not Use It:** If VisionOS required a standalone monolithic UI with built-in multi-tenant user access control (which VisionOS handles at the platform layer via `services/auth-service` and `apps/admin-dashboard`).

---

## 2. Shinobi CCTV

### Purpose
Shinobi is an open-source, Node.js-based video management system designed for camera recording, live stream monitoring, and modular plugin-based object detection.

### Technical Profile

| Criterion | Evaluation & Details |
| :--- | :--- |
| **License** | **Dual Licensed.** Shinobi CE is licensed under **GPLv3** (unmaintained). Shinobi Pro uses a **Custom Open Source EULA**. |
| **Commercial Usage** | **Restricted.** Commercial deployments of Shinobi Pro require a paid subscription/commercial license under the custom EULA. |
| **GPU Support** | **Supported.** Hardware decoding/encoding via FFmpeg parameters (NVIDIA CUDA, Intel QuickSync, VAAPI) and Edge TPU plugins. |
| **MQTT Support** | **Plugin / Webhook Based.** Requires auxiliary plugin configurations or WebSockets for real-time event broadcasting. |
| **REST API** | **Comprehensive.** Full RESTful API for monitor control, stream retrieval, and system administration. |
| **ONVIF Support** | **Supported.** Native ONVIF camera scanner, IP discovery, and PTZ controls. |
| **Docker Support** | **Supported.** Official Docker images maintained for multi-container deployments. |
| **Active Community** | **Moderate.** Active commercial vendor support for Shinobi Pro; open-source community is split between CE and Pro editions. |
| **Scalability** | **Cluster Architecture.** Supports master/child multi-node clustering for spreading stream processing across worker nodes. |

### Advantages
- Written entirely in Node.js, providing code familiarity for JavaScript developers.
- Built-in multi-camera grid dashboard and user account management UI out of the box.
- Distributed master-worker cluster mode for multi-server stream balancing.

### Disadvantages
- Complex commercial licensing requiring per-node or monthly subscription fees for enterprise closed deployments.
- Higher memory footprint and CPU overhead due to Node.js event loops spawning FFmpeg sub-processes per feed.
- AI detection is implemented via external plugins rather than a tightly coupled frame pipeline.

### Why We Should or Should Not Use It
- **Why Use It:** If VisionOS required an off-the-shelf Node.js NVR with a ready-made user UI and native clustering.
- **Why Not Use It:** Custom EULA licensing costs for commercial distribution, higher latency in AI frame pipelines, and redundant UI features that overlap with VisionOS `apps/customer-dashboard`.

---

## 3. ZoneMinder

### Purpose
ZoneMinder is a legacy open-source video surveillance platform suite (written in C++, Perl, and PHP) designed for Linux environments to provide capture, analysis, recording, and monitoring of security cameras.

### Technical Profile

| Criterion | Evaluation & Details |
| :--- | :--- |
| **License** | **GNU General Public License v2+ (GPLv2+)** |
| **Commercial Usage** | **Permitted under GPLv2.** Requires open-sourcing modified code derivatives if distributed. |
| **GPU Support** | **Limited / Experimental.** GPU decoding available via FFmpeg (CUDA/VAAPI), but core motion analysis daemons remain heavily CPU-bound. |
| **MQTT Support** | **Third-Party Plugin.** Requires installation and configuration of `zmeventnotification` (Event Notification Server). |
| **REST API** | **Supported.** RESTful API (CakePHP backend) with JWT authentication (v1.34+). |
| **ONVIF Support** | **Supported.** Full ONVIF discovery, event handling, and PTZ control integration. |
| **Docker Support** | **Community Maintained.** Requires explicit container tuning (large `/dev/shm` shared memory allocation). |
| **Active Community** | **Legacy / Slow.** Long-standing project history, but slower modernization pace compared to contemporary edge AI NVRs. |
| **Scalability** | **Multi-Server Shared Memory.** Supports multi-server setups separating DB, capture, and storage daemons. |

### Advantages
- 20+ years of operational history with deep protocol and legacy IP camera compatibility.
- Highly configurable pixel-level motion detection zones and alarm triggers.
- Proven multi-server architecture for high camera counts across traditional Linux servers.

### Disadvantages
- High technical debt in C++/Perl/PHP codebase.
- High CPU utilization caused by continuous shared-memory pixel-by-pixel frame analysis.
- Lack of native modern AI object detection (requires complex third-party daemon integrations).
- Copyleft GPLv2 license imposes source disclosure requirements for proprietary platform extensions.

### Why We Should or Should Not Use It
- **Why Use It:** For legacy deployments requiring complex pixel-based zone triggers without AI hardware accelerators.
- **Why Not Use It:** Inefficient CPU usage, lack of native modern AI pipeline integration, legacy architecture, and restrictive GPL copyleft licensing.

---

## Comparative Matrix

| Feature / Criteria | Frigate NVR | Shinobi CCTV | ZoneMinder |
| :--- | :--- | :--- | :--- |
| **License** | **MIT** | Custom EULA (Pro) / GPLv3 (CE) | GPLv2+ |
| **Commercial Usage** | Free & Unrestricted | Paid License Required | Free (GPL restrictions apply) |
| **AI Acceleration** | Native (Coral, TensorRT, OpenVINO) | Plugin-based | Third-party daemon only |
| **GPU Support** | Excellent (NVIDIA, Intel, AMD, Coral) | Good (NVIDIA, Intel via FFmpeg) | Basic (FFmpeg decode only) |
| **MQTT Support** | Native (First-class) | Plugin / Webhook | Third-party (`zmeventnotification`) |
| **REST API** | Modern HTTP & OpenAPI | Modern HTTP | CakePHP REST API |
| **ONVIF & PTZ** | Native via `go2rtc` | Native | Native |
| **Docker Integration** | Official & Production-Ready | Official | Community maintained |
| **Resource Efficiency** | Extremely High (Motion-gated) | Moderate | Low (CPU bound) |

---

## Final Recommendation for VisionOS

### Selected Platform: **Frigate NVR**

### Architectural Rationale

1. **Permissive Commercial Licensing (MIT):**
   Frigate's MIT license allows VisionOS to package, deploy, and orchestrate edge NVR containers across commercial customer sites without licensing fees or GPL copyleft compliance risks.

2. **Native Edge AI & Hardware Acceleration:**
   Frigate is built around modern hardware accelerators (Google Coral TPU, NVIDIA TensorRT, Intel OpenVINO). Its motion-gated inference design ensures that AI detectors process only frames with active motion, preserving GPU compute capacity for custom VisionOS models (`services/ai-custom-service`).

3. **Event-Driven Microservice Synergy:**
   Frigate's native MQTT event bus publishes structured JSON alerts instantly upon object detection. This aligns with VisionOS's event-driven architecture, enabling `services/pipeline-service` and `services/notification-service` to ingest alerts with sub-second latency.

4. **Separation of Concerns:**
   Using Frigate as an edge worker via `infra/frigate-config` delegates video capture and stream management to a specialized engine. This allows VisionOS to focus on enterprise multi-tenant administration (`apps/admin-dashboard`), customer portals (`apps/customer-dashboard`), auth (`services/auth-service`), and ERP integrations (`services/erp-service`).
