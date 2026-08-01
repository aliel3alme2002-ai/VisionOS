export class WorkflowStartedEvent {
  constructor(
    public readonly executionId: string,
    public readonly workflowId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
