import { Injectable, Inject } from '@nestjs/common';
import { RuleAction } from '../domain/rule-action';
import { RuleContext } from '../domain/rule-context';
import { RuleActionProvider, RULE_ACTION_PROVIDER } from '../providers/rule-action.provider';

@Injectable()
export class ActionPlannerService {
  constructor(
    @Inject(RULE_ACTION_PROVIDER) private readonly actionProvider: RuleActionProvider
  ) {}

  async planActions(actions: RuleAction[], context: RuleContext): Promise<void> {
    const sortedActions = [...actions].sort((a, b) => a.order - b.order);
    
    for (const action of sortedActions) {
      await this.actionProvider.executeAction(action, context);
    }
  }
}
