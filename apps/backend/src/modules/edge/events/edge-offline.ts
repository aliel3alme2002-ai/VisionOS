export class EdgeOfflineEvent {
  constructor(
    public readonly edgeId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
