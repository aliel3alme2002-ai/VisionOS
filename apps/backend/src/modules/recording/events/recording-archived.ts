export class RecordingArchivedEvent {
  constructor(
    public readonly recordingId: string,
    public readonly storageLocation: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
