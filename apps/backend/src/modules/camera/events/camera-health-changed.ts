import { CameraHealth } from '../domain/camera-health';

export class CameraHealthChangedEvent {
  constructor(
    public readonly health: CameraHealth,
    public readonly timestamp: Date = new Date()
  ) {}
}
