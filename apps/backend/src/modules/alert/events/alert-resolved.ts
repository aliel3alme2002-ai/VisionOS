export class AlertResolvedEvent {
  constructor(
    public readonly alertId: string,
    public readonly resolvedBy: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
