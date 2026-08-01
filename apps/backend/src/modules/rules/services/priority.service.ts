import { Injectable } from '@nestjs/common';
import { Rule } from '../domain/rule';

@Injectable()
export class PriorityService {
  sortRulesByPriority(rules: Rule[]): Rule[] {
    return [...rules].sort((a, b) => b.priority - a.priority);
  }
}
