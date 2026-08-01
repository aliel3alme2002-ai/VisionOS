export class WorkflowFailedEvent {
  constructor(
    public readonly executionId: string,
    public readonly workflowId: string,
    public readonly error: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
