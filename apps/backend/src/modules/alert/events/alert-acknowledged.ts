export class AlertAcknowledgedEvent {
  constructor(
    public readonly alertId: string,
    public readonly userId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
