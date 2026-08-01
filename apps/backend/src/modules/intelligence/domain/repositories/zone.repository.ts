import { Zone } from '../entities/zone';

export interface IZoneRepository {
  save(zone: Zone): Promise<void>;
  findById(id: string): Promise<Zone | null>;
  findByCameraId(cameraId: string): Promise<Zone[]>;
}
