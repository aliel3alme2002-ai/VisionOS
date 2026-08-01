export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: string;
  startedAt: Date;
  finishedAt?: Date;
  currentStep: string;
}
