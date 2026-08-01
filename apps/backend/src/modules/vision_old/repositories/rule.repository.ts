import { Rule } from '../domain/rule';

export interface RuleRepository {
  findById(id: string): Promise<Rule | null>;
  findAll(): Promise<Rule[]>;
  save(rule: Rule): Promise<void>;
  delete(id: string): Promise<void>;
}

export const RULE_REPOSITORY = Symbol('RULE_REPOSITORY');
