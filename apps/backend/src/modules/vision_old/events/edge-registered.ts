export class EdgeRegisteredEvent {
  constructor(
    public readonly edgeId: string,
    public readonly organizationId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
