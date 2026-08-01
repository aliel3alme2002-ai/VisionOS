export class TrackingEndedEvent {
  constructor(
    public readonly trackId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
