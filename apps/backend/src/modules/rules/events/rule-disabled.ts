export class RuleDisabledEvent {
  constructor(
    public readonly ruleId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
