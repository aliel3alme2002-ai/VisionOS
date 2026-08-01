export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  steps: Record<string, unknown>[];
}
