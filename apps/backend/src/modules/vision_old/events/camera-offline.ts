export class CameraOfflineEvent {
  constructor(
    public readonly cameraId: string,
    public readonly reason: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
