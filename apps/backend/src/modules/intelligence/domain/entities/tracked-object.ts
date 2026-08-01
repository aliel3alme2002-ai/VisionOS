import { BoundingBox } from '../value-objects/bounding-box';

export interface TrackedObjectProps {
  id: string;
  trackingId: string;
  className: string;
  confidence: number;
  bbox: BoundingBox;
  velocity?: number;
  direction?: string | null;
  zone?: string | null;
  firstSeen?: Date;
  lastSeen?: Date;
}

export class TrackedObject {
  public readonly id: string;
  public readonly trackingId: string;
  public readonly className: string;
  public readonly confidence: number;
  public readonly bbox: BoundingBox;
  public readonly velocity: number;
  public readonly direction: string | null;
  public zone: string | null;
  public readonly firstSeen: Date;
  public lastSeen: Date;

  constructor(props: TrackedObjectProps) {
    this.id = props.id;
    this.trackingId = props.trackingId;
    this.className = props.className;
    this.confidence = props.confidence;
    this.bbox = props.bbox;
    this.velocity = props.velocity ?? 0;
    this.direction = props.direction ?? null;
    this.zone = props.zone ?? null;
    this.firstSeen = props.firstSeen ?? new Date();
    this.lastSeen = props.lastSeen ?? new Date();
  }

  public updatePosition(bbox: BoundingBox, velocity?: number, direction?: string): void {
    (this as any).bbox = bbox;
    if (velocity !== undefined) (this as any).velocity = velocity;
    if (direction) (this as any).direction = direction;
    this.lastSeen = new Date();
  }
}
