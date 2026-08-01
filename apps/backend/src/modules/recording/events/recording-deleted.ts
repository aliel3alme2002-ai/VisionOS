export class RecordingDeletedEvent {
  constructor(
    public readonly recordingId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
