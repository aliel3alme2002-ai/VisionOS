export class LineCrossedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly lineId: string, public readonly trackingId: string, public readonly direction: string) {}
}
