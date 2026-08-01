import { Injectable, Inject } from '@nestjs/common';
import { WorkflowContext } from '../domain/workflow-context';
import { WorkflowActionProvider, WORKFLOW_ACTION_PROVIDER } from '../providers/workflow-action.provider';
import { WorkflowRepository, WORKFLOW_REPOSITORY } from '../repositories/workflow.repository';

@Injectable()
export class StepExecutorService {
  constructor(
    @Inject(WORKFLOW_ACTION_PROVIDER) private readonly actionProvider: WorkflowActionProvider,
    @Inject(WORKFLOW_REPOSITORY) private readonly workflowRepo: WorkflowRepository
  ) {}

  async executeStep(stepId: string, context: WorkflowContext): Promise<boolean> {
    const action = await this.workflowRepo.getStepAction(stepId);
    if (action) {
      return this.actionProvider.execute(action, context);
    }
    return false;
  }
}
