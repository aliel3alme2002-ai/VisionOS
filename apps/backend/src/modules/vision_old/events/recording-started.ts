export class RecordingStartedEvent {
  constructor(
    public readonly recordingId: string,
    public readonly cameraId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
