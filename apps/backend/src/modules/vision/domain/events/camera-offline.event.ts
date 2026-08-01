export class CameraOfflineEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly cameraId: string, public readonly organizationId: string) {}
}
