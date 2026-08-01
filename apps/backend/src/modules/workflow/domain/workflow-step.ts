export type WorkflowStepType = 
  | 'ACTION' | 'CONDITION' | 'PARALLEL' | 'DELAY' | 'WAIT' | 'END';

export interface WorkflowStep {
  id: string;
  workflowId: string;
  name: string;
  type: WorkflowStepType;
  order: number;
  timeout?: number;
  retryPolicy?: string;
  nextStep?: string;
}
