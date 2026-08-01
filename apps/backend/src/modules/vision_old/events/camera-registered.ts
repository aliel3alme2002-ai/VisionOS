export class CameraRegisteredEvent {
  constructor(
    public readonly cameraId: string,
    public readonly organizationId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
