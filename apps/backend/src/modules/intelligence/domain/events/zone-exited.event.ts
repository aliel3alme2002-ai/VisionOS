export class ZoneExitedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly zoneId: string, public readonly trackingId: string, public readonly cameraId: string) {}
}
