export class IntrusionDetectedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly zoneId: string, public readonly trackingId: string) {}
}
