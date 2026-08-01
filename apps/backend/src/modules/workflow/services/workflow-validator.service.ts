import { Injectable } from '@nestjs/common';
import { Workflow } from '../domain/workflow';
import { WorkflowStep } from '../domain/workflow-step';

@Injectable()
export class WorkflowValidatorService {
  validate(workflow: Workflow, steps: WorkflowStep[]): boolean {
    if (!workflow.name) return false;
    if (steps.length === 0) return false;
    return true;
  }
}
