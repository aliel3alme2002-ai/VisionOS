export class RuleFailedEvent {
  constructor(
    public readonly ruleId: string,
    public readonly error: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
