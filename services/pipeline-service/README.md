# Pipeline Service (`services/pipeline-service`)

## Responsibility

The `pipeline-service` orchestrates real-time video frame ingestion, pre-processing workflows, event routing, and downstream distribution to AI inference engines.

## Boundaries & Capabilities

- **Stream Ingestion & Demuxing**: Receives video frame buffers, MQTT event payloads, or RTSP feeds.
- **Frame Sampler & Filter**: Manages frame sampling rates, motion region-of-interest (ROI) filtering, and dynamic resolution scaling.
- **Inference Pipeline Dispatcher**: Routes pre-processed frame batches to `ai-custom-service` worker pools.
- **Event Bus Publisher**: Publishes structured detection events (bounding boxes, object labels, timestamps) to message brokers.

## Dependencies & Shared Libraries

- Imports pipeline event schemas and ROI data types from `@visionos/shared`.
- Integrates directly with `camera-service` for stream references and `ai-custom-service` for model inference.
