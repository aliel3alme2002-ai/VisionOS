export class QueueDetectedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly zoneId: string, public readonly count: number) {}
}
