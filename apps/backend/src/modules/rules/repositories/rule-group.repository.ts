import { RuleGroup } from '../domain/rule-group';

export interface RuleGroupRepository {
  findById(id: string): Promise<RuleGroup | null>;
  findAll(): Promise<RuleGroup[]>;
  save(group: RuleGroup): Promise<void>;
  delete(id: string): Promise<void>;
}

export const RULE_GROUP_REPOSITORY = Symbol('RULE_GROUP_REPOSITORY');
