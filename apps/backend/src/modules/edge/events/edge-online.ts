export class EdgeOnlineEvent {
  constructor(
    public readonly edgeId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
