export class ModelAssignedEvent {
  constructor(
    public readonly modelId: string,
    public readonly cameraId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
