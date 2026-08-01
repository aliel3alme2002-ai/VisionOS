import { Injectable, Inject } from '@nestjs/common';
import { Workflow } from '../domain/workflow';
import { WorkflowRepository, WORKFLOW_REPOSITORY } from '../repositories/workflow.repository';

@Injectable()
export class WorkflowBuilderService {
  constructor(
    @Inject(WORKFLOW_REPOSITORY) private readonly workflowRepo: WorkflowRepository
  ) {}

  async createWorkflow(workflow: Workflow): Promise<void> {
    await this.workflowRepo.save(workflow);
  }
}
