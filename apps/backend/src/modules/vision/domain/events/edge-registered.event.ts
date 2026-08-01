export class EdgeRegisteredEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly edgeNodeId: string, public readonly organizationId: string, public readonly name: string) {}
}
