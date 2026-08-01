import { RuleResult } from '../domain/rule-result';

export class RuleTriggeredEvent {
  constructor(
    public readonly result: RuleResult,
    public readonly timestamp: Date = new Date()
  ) {}
}
