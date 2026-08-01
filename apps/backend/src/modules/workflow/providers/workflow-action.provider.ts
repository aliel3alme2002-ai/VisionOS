import { WorkflowAction } from '../domain/workflow-action';
import { WorkflowContext } from '../domain/workflow-context';

export interface WorkflowActionProvider {
  execute(action: WorkflowAction, context: WorkflowContext): Promise<boolean>;
}

export const WORKFLOW_ACTION_PROVIDER = Symbol('WORKFLOW_ACTION_PROVIDER');
