export interface WorkflowResult {
  workflowId: string;
  success: boolean;
  duration: number;
  executedSteps: string[];
  failedSteps: string[];
}
