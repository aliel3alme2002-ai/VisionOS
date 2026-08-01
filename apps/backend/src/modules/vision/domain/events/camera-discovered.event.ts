export class CameraDiscoveredEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly ipAddress: string, public readonly manufacturer?: string | null) {}
}
