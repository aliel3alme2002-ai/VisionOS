export interface WorkflowAction {
  id: string;
  stepId: string;
  type: string;
  parameters: Record<string, unknown>;
}
