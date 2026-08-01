export class DeploymentAssignedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly edgeNodeId: string, public readonly slotId: string, public readonly runtime: string) {}
}
