import { WorkflowResult } from '../domain/workflow-result';

export class WorkflowCompletedEvent {
  constructor(
    public readonly result: WorkflowResult,
    public readonly timestamp: Date = new Date()
  ) {}
}
