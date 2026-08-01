export class CameraHealthChangedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly cameraId: string, public readonly status: string) {}
}
