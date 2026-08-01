export class EventTrigger {
  constructor(
    public readonly ruleId: string,
    public readonly actionType: string,
    public readonly executedAt: Date = new Date(),
  ) {}
}
