export class StepFailedEvent {
  constructor(
    public readonly executionId: string,
    public readonly stepId: string,
    public readonly error: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
