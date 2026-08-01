export interface WorkflowCondition {
  id: string;
  stepId: string;
  variable: string;
  operator: string;
  value: string;
  trueNextStep?: string;
  falseNextStep?: string;
}
