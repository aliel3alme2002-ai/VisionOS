import { Injectable, Inject } from '@nestjs/common';
import { IRuleRepository } from '../repositories/rule.repository';
import { Rule } from '../entities/rule';
import { Detection } from '../entities/detection';

@Injectable()
export class RuleEvaluationService {
  constructor(
    @Inject('IRuleRepository') private readonly ruleRepository: IRuleRepository,
  ) {}

  public async evaluateRules(organizationId: string, detection: Detection): Promise<Rule[]> {
    const rules = await this.ruleRepository.findActiveByOrgId(organizationId);
    const triggered: Rule[] = [];
    for (const rule of rules) {
      if (rule.enabled && detection.objects.length > 0) {
        triggered.push(rule);
      }
    }
    return triggered;
  }
}
