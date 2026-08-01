export class RecordingStoppedEvent {
  constructor(
    public readonly recordingId: string,
    public readonly duration: number,
    public readonly timestamp: Date = new Date()
  ) {}
}
