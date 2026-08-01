export class CameraCreatedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly cameraId: string, public readonly organizationId: string, public readonly name: string) {}
}
