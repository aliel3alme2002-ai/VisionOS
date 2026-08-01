export class SnapshotCreatedEvent {
  constructor(
    public readonly cameraId: string,
    public readonly snapshotUrl: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
