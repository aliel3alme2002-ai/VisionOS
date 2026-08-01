# AI Custom Service (`services/ai-custom-service`)

## Responsibility

The `ai-custom-service` provides microservice abstraction wrappers around custom Computer Vision and Deep Learning model inference execution engines.

## Boundaries & Capabilities

- **Model Execution Runtime**: Wraps inference runtimes (ONNX Runtime, TensorRT, PyTorch TorchScript, OpenVINO) for object detection, segmentation, and classification.
- **Model Registry & Hot-Swapping**: Dynamically loads custom-trained customer models without service restart.
- **Hardware Acceleration Abstraction**: Interfaces with host GPU acceleration resources (NVIDIA CUDA/TensorRT, Coral TPU, OpenVINO).
- **Post-Processing & NMS**: Applies Non-Maximum Suppression (NMS), confidence thresholding, and tracking ID assignment.

## Dependencies & Shared Libraries

- Imports tensor DTOs, model metadata schemas, and detection result types from `@visionos/shared`.
- Consumes frame payloads from `pipeline-service`.
