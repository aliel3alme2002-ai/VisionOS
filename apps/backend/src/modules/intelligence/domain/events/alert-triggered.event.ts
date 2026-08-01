export class AlertTriggeredEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly ruleId: string, public readonly message: string) {}
}
