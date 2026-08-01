# Camera Service (`services/camera-service`)

## Responsibility

The `camera-service` manages IP camera device inventories, RTSP/ONVIF configuration, stream connection state, and synchronization with edge Frigate NVR nodes.

## Boundaries & Capabilities

- **Camera Registry & Metadata**: CRUD management of IP cameras, location tagging, stream URLs, and credentials.
- **ONVIF Discovery & Control**: Network discovery of local IP cameras, PTZ (Pan-Tilt-Zoom) command dispatching.
- **Frigate NVR Sync**: Dynamically provisions camera streams into Frigate NVR configuration files and container instances (`infra/frigate-config`).
- **Health Monitoring**: Continuous ping, connection status checks, and stream health diagnostics.

## Dependencies & Shared Libraries

- Imports camera configurations and stream DTOs from `@visionos/shared`.
- Publishes stream status updates to `pipeline-service` and `notification-service`.
