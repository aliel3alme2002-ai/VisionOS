import { RuleVariable } from '../domain/rule-variable';

export interface RuleVariableProvider {
  resolveVariable(key: string, context: unknown): Promise<RuleVariable>;
}

export const RULE_VARIABLE_PROVIDER = Symbol('RULE_VARIABLE_PROVIDER');
