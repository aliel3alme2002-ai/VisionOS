export class DeploymentReleasedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly edgeNodeId: string, public readonly slotId: string) {}
}
