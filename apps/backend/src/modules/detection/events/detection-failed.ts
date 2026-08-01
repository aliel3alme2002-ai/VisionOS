export class DetectionFailedEvent {
  constructor(
    public readonly jobId: string,
    public readonly reason: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
