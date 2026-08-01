export class TrackingUpdatedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly trackingId: string, public readonly cameraId: string) {}
}
