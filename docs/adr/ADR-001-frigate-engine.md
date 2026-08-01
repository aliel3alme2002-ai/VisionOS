# ADR-001: Selection of Frigate NVR as Edge Vision & Camera Ingestion Engine

* **Status:** Accepted
* **Date:** 2026-07-31
* **Deciders:** VisionOS Architecture Team

---

## 1. Context

VisionOS requires an edge video ingestion and computer vision processing engine capable of:
1. Ingesting multiple real-time RTSP streams from IP cameras across customer facilities.
2. Filtering continuous video feeds via motion gating to minimize GPU and CPU compute overhead.
3. Performing hardware-accelerated AI object detection (NVIDIA CUDA/TensorRT, Intel OpenVINO, Coral Edge TPU).
4. Providing real-time WebRTC/MSE video stream remuxing for dashboard live viewing.
5. Broadcasting structured object detection event notifications to downstream microservices with sub-second latency.

Building an NVR stream engine and inference pipeline from scratch would consume significant engineering overhead and delay core business functionality.

A technical evaluation (`docs/research-sprint/catalog.md`) was conducted analyzing **Frigate NVR**, **Shinobi CCTV**, and **ZoneMinder**.

---

## 2. Decision

VisionOS will adopt **Frigate NVR** as its edge camera ingestion, video streaming, and baseline AI object detection engine.

Frigate will run as a containerized edge process managed by `services/camera-service` via dynamic `config.yml` template generation.

---

## 3. Consequences

### Positive
* **Permissive MIT License:** Unrestricted commercial usage with zero copyleft disclosure requirements.
* **Hardware Efficiency:** Motion-gated inference ensures AI detectors process only frames with active pixel motion, preserving GPU compute capacity for custom VisionOS models (`services/ai-custom-service`).
* **Event-Driven Synergy:** Publishes structured JSON events natively to Mosquitto MQTT (`frigate/<camera>/events`), aligning directly with `services/pipeline-service`.
* **High-Performance Streaming:** Integrated `go2rtc` engine provides zero-latency WebRTC, MSE, and RTSP re-streaming.

### Tradeoffs / Negative
* Frigate does not natively provide enterprise multi-tenant authentication or billing user interfaces. These capabilities are owned by VisionOS platform services (`services/auth-service`, `apps/admin-dashboard`, `apps/customer-dashboard`).
