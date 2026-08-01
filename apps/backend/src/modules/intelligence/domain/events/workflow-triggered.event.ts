export class WorkflowTriggeredEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly ruleId: string, public readonly workflowName: string) {}
}
