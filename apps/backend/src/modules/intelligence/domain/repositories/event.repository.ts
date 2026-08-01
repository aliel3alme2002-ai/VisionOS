import { Event } from '../entities/event';

export interface IEventRepository {
  save(event: Event): Promise<void>;
  findById(id: string): Promise<Event | null>;
  findByCameraId(cameraId: string): Promise<Event[]>;
}
