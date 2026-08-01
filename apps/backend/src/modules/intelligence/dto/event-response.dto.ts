import { Event } from '../domain/entities/event';

export class EventResponseDto {
  id!: string;
  type!: string;
  cameraId!: string;
  trackingId!: string | null;
  timestamp!: string;

  public static fromEntity(ev: Event): EventResponseDto {
    const dto = new EventResponseDto();
    dto.id = ev.id;
    dto.type = ev.type;
    dto.cameraId = ev.cameraId;
    dto.trackingId = ev.trackingId;
    dto.timestamp = ev.timestamp.toISOString();
    return dto;
  }
}
