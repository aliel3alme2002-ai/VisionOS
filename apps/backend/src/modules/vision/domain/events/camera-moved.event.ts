export class CameraMovedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly cameraId: string, public readonly fromEdgeId: string | null, public readonly toEdgeId: string | null) {}
}
