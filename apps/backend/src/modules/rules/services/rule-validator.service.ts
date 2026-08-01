import { Injectable } from '@nestjs/common';
import { Rule } from '../domain/rule';
import { RuleCondition } from '../domain/rule-condition';
import { RuleAction } from '../domain/rule-action';

@Injectable()
export class RuleValidatorService {
  validateRule(rule: Rule, conditions: RuleCondition[], actions: RuleAction[]): boolean {
    if (!rule.name) return false;
    if (conditions.length === 0) return false;
    if (actions.length === 0) return false;
    return true;
  }
}
