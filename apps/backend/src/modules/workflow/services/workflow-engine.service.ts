import { Injectable } from '@nestjs/common';
import { WorkflowContext } from '../domain/workflow-context';
import { WorkflowRunnerService } from './workflow-runner.service';

@Injectable()
export class WorkflowEngineService {
  constructor(
    private readonly runner: WorkflowRunnerService
  ) {}

  async triggerWorkflow(workflowId: string, context: WorkflowContext): Promise<string> {
    return this.runner.startExecution(workflowId, context);
  }
}
