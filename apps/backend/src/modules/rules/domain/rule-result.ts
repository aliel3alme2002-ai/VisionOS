import { RuleAction } from './rule-action';

export interface RuleResult {
  ruleId: string;
  matched: boolean;
  reason: string;
  actions: RuleAction[];
  processingTime: number;
}
