import { Workflow } from '../domain/workflow';
import { WorkflowStep } from '../domain/workflow-step';
import { WorkflowAction } from '../domain/workflow-action';
import { WorkflowCondition } from '../domain/workflow-condition';

export interface WorkflowRepository {
  findById(id: string): Promise<Workflow | null>;
  findByOrganization(organizationId: string): Promise<Workflow[]>;
  save(workflow: Workflow): Promise<void>;
  delete(id: string): Promise<void>;
  
  getSteps(workflowId: string): Promise<WorkflowStep[]>;
  getStepAction(stepId: string): Promise<WorkflowAction | null>;
  getStepCondition(stepId: string): Promise<WorkflowCondition | null>;
}

export const WORKFLOW_REPOSITORY = Symbol('WORKFLOW_REPOSITORY');
