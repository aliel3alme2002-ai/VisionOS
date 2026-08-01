export class DeviceSynchronizedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly deviceId: string) {}
}
