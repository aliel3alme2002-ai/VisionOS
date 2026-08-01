import { CameraConfiguration } from '../domain/camera-configuration';

export class CameraUpdatedEvent {
  constructor(
    public readonly camera: CameraConfiguration,
    public readonly timestamp: Date = new Date()
  ) {}
}
