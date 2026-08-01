export interface EventProps {
  id: string;
  type: string;
  cameraId: string;
  trackingId?: string | null;
  timestamp?: Date;
  payload?: Record<string, unknown>;
}

export class Event {
  public readonly id: string;
  public readonly type: string;
  public readonly cameraId: string;
  public readonly trackingId: string | null;
  public readonly timestamp: Date;
  public readonly payload: Record<string, unknown>;

  constructor(props: EventProps) {
    this.id = props.id;
    this.type = props.type;
    this.cameraId = props.cameraId;
    this.trackingId = props.trackingId ?? null;
    this.timestamp = props.timestamp ?? new Date();
    this.payload = props.payload ?? {};
  }
}
