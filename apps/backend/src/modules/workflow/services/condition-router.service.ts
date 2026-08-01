import { Injectable, Inject } from '@nestjs/common';
import { WorkflowContext } from '../domain/workflow-context';
import { WorkflowRepository, WORKFLOW_REPOSITORY } from '../repositories/workflow.repository';

@Injectable()
export class ConditionRouterService {
  constructor(
    @Inject(WORKFLOW_REPOSITORY) private readonly workflowRepo: WorkflowRepository
  ) {}

  async evaluateRouting(stepId: string, context: WorkflowContext): Promise<string | null> {
    const condition = await this.workflowRepo.getStepCondition(stepId);
    if (!condition) return null;
    if (!context) return null;
    
    // Dummy evaluation
    return condition.trueNextStep || null;
  }
}
