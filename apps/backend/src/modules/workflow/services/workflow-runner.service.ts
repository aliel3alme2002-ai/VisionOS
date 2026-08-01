import { Injectable, Inject } from '@nestjs/common';
import { WorkflowContext } from '../domain/workflow-context';
import { WorkflowExecutionRepository, WORKFLOW_EXECUTION_REPOSITORY } from '../repositories/workflow-execution.repository';
import { StepExecutorService } from './step-executor.service';
import { WorkflowRepository, WORKFLOW_REPOSITORY } from '../repositories/workflow.repository';

@Injectable()
export class WorkflowRunnerService {
  constructor(
    @Inject(WORKFLOW_EXECUTION_REPOSITORY) private readonly executionRepo: WorkflowExecutionRepository,
    @Inject(WORKFLOW_REPOSITORY) private readonly workflowRepo: WorkflowRepository,
    private readonly stepExecutor: StepExecutorService
  ) {}

  async startExecution(workflowId: string, context: WorkflowContext): Promise<string> {
    const steps = await this.workflowRepo.getSteps(workflowId);
    if (!steps || steps.length === 0) return 'no_steps';
    
    // In reality, this would initiate a distributed execution via temporal or similar
    // Here we just simulate synchronous start for the domain boundary
    const executionId = `exec_${Date.now()}`;
    await this.executionRepo.save({
      id: executionId,
      workflowId,
      status: 'STARTED',
      startedAt: new Date(),
      currentStep: 'START'
    });
    
    const firstStep = steps.find(s => s.order === 1);
    if (firstStep) {
      await this.stepExecutor.executeStep(firstStep.id, context);
    }
    return executionId;
  }
}
