# Frigate NVR Configurations (`infra/frigate-config`)

## Responsibility

The `infra/frigate-config` folder stores configuration presets, YAML templates, and detector definitions for integration with Frigate NVR (Network Video Recorder).

## Contents & Configurations

- **`config.example.yml`**: Baseline Frigate configuration specifying camera streams, motion masks, and MQTT broker endpoints.
- **`detectors/`**: Presets for hardware acceleration targets:
  - NVIDIA TensorRT / CUDA GPUs
  - Coral USB / PCIe Edge TPUs
  - OpenVINO / CPU fallback detectors
- **`zones/`**: Standardized Region of Interest (ROI) and detection zone templates.

## Integration Notes

- Events captured by Frigate NVR are broadcast via MQTT topics (`frigate/events`) and consumed directly by VisionOS `camera-service` and `pipeline-service`.
