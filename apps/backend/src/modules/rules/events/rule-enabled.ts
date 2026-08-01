export class RuleEnabledEvent {
  constructor(
    public readonly ruleId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
