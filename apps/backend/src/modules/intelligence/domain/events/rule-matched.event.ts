export class RuleMatchedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly ruleId: string, public readonly cameraId: string) {}
}
