export class EdgeHeartbeatReceivedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly edgeNodeId: string, public readonly timestamp: Date) {}
}
