import { Injectable, Inject } from '@nestjs/common';
import { RuleRepository, RULE_REPOSITORY } from '../repositories/rule.repository';
import { RuleContext } from '../domain/rule-context';
import { ConditionEvaluatorService } from './condition-evaluator.service';
import { ActionPlannerService } from './action-planner.service';

@Injectable()
export class RuleEngineService {
  constructor(
    @Inject(RULE_REPOSITORY) private readonly ruleRepo: RuleRepository,
    private readonly evaluator: ConditionEvaluatorService,
    private readonly planner: ActionPlannerService
  ) {}

  async processEvent(context: RuleContext): Promise<void> {
    const rules = await this.ruleRepo.findByOrganization(context.organizationId);
    
    for (const rule of rules) {
      if (!rule.enabled) continue;
      
      const conditions = await this.ruleRepo.getConditions(rule.id);
      const matched = await this.evaluator.evaluate(conditions, context);
      
      if (matched) {
        const actions = await this.ruleRepo.getActions(rule.id);
        await this.planner.planActions(actions, context);
      }
    }
  }
}
