import { WorkflowExecution } from '../domain/workflow-execution';

export interface WorkflowExecutionRepository {
  findById(id: string): Promise<WorkflowExecution | null>;
  save(execution: WorkflowExecution): Promise<void>;
  updateStatus(id: string, status: string, finishedAt?: Date): Promise<void>;
}

export const WORKFLOW_EXECUTION_REPOSITORY = Symbol('WORKFLOW_EXECUTION_REPOSITORY');
