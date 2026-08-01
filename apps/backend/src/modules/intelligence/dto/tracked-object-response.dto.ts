import { TrackedObject } from '../domain/entities/tracked-object';

export class TrackedObjectResponseDto {
  id!: string;
  trackingId!: string;
  className!: string;
  confidence!: number;
  bbox!: { x: number; y: number; width: number; height: number };
  velocity!: number;
  direction!: string | null;
  zone!: string | null;
  firstSeen!: string;
  lastSeen!: string;

  public static fromEntity(obj: TrackedObject): TrackedObjectResponseDto {
    const dto = new TrackedObjectResponseDto();
    dto.id = obj.id;
    dto.trackingId = obj.trackingId;
    dto.className = obj.className;
    dto.confidence = obj.confidence;
    dto.bbox = { x: obj.bbox.x, y: obj.bbox.y, width: obj.bbox.width, height: obj.bbox.height };
    dto.velocity = obj.velocity;
    dto.direction = obj.direction;
    dto.zone = obj.zone;
    dto.firstSeen = obj.firstSeen.toISOString();
    dto.lastSeen = obj.lastSeen.toISOString();
    return dto;
  }
}
