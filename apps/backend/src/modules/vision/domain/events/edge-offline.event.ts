export class EdgeOfflineEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly edgeNodeId: string) {}
}
