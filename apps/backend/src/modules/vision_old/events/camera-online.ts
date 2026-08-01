export class CameraOnlineEvent {
  constructor(
    public readonly cameraId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
