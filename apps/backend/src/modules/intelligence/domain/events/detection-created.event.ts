export class DetectionCreatedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly detectionId: string, public readonly cameraId: string, public readonly count: number) {}
}
