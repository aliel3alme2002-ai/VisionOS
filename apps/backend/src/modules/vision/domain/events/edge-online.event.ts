export class EdgeOnlineEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly edgeNodeId: string) {}
}
