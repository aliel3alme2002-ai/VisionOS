import { RuleEvaluationResult } from '../models/rule-result';

export class RuleEvaluatedEvent {
  constructor(public readonly result: RuleEvaluationResult) {}
}
