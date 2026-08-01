export class AlertClosedEvent {
  constructor(
    public readonly alertId: string,
    public readonly closedBy: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
