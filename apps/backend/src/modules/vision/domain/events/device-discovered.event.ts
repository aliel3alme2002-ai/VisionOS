export class DeviceDiscoveredEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly deviceId: string, public readonly ipAddress: string) {}
}
