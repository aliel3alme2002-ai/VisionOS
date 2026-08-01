export class StepStartedEvent {
  constructor(
    public readonly executionId: string,
    public readonly stepId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
