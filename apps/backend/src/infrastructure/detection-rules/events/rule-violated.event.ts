import { RuleViolation } from '../models/rule-violation';

export class RuleViolatedEvent {
  constructor(public readonly violation: RuleViolation) {}
}
