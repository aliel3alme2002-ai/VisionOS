import { RuleStatus } from '../enums/rule-status';

export interface RuleCondition {
  type: string;
  operator: string;
  value: any;
}

export interface RuleAction {
  type: string;
  payload: any;
}

export interface Rule {
  id: string;
  name: string;
  enabled: boolean;
  status: RuleStatus;
  conditions: RuleCondition[];
  actions: RuleAction[];
  priority: number;
}
