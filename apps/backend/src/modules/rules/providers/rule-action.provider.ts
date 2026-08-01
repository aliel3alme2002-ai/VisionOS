import { RuleAction } from '../domain/rule-action';
import { RuleContext } from '../domain/rule-context';

export interface RuleActionProvider {
  executeAction(action: RuleAction, context: RuleContext): Promise<boolean>;
}

export const RULE_ACTION_PROVIDER = Symbol('RULE_ACTION_PROVIDER');
