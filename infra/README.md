# Infrastructure Directory

The `infra/` directory contains all container configurations, orchestration blueprints, and hardware/NVR settings for local development and production deployments of VisionOS.

## Subdirectories

- **[`docker`](./docker/README.md)**: Docker Compose blueprints, service Dockerfiles, and container networking configs.
- **[`frigate-config`](./frigate-config/README.md)**: Frigate NVR YAML configuration files, RTSP stream definitions, hardware detector mappings, and MQTT topic rules.

## Operating Principles

- **Environment Neutrality**: Infrastructure configurations support both cloud-hosted Kubernetes/Docker deployments and edge-deployed on-premise hardware nodes.
- **Hardware Acceleration**: Preserves configuration presets for NVIDIA CUDA GPUs, Google Coral TPUs, and Intel OpenVINO VPU acceleration.
