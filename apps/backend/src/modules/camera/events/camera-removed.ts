export class CameraRemovedEvent {
  constructor(
    public readonly cameraId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
