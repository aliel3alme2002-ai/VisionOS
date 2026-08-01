import { Rule } from '../domain/rule';
import { RuleCondition } from '../domain/rule-condition';
import { RuleAction } from '../domain/rule-action';
import { RuleFilter } from '../domain/rule-filter';

export interface RuleRepository {
  findById(id: string): Promise<Rule | null>;
  findByOrganization(organizationId: string): Promise<Rule[]>;
  save(rule: Rule): Promise<void>;
  delete(id: string): Promise<void>;
  
  getConditions(ruleId: string): Promise<RuleCondition[]>;
  getActions(ruleId: string): Promise<RuleAction[]>;
  getFilter(ruleId: string): Promise<RuleFilter | null>;
}

export const RULE_REPOSITORY = Symbol('RULE_REPOSITORY');
