export class RuleSkippedEvent {
  constructor(
    public readonly ruleId: string,
    public readonly reason: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
