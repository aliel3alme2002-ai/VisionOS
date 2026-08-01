import { Zone } from '../domain/zone';

export interface ZoneRepository {
  findById(id: string): Promise<Zone | null>;
  findByCamera(cameraId: string): Promise<Zone[]>;
  save(zone: Zone): Promise<void>;
  delete(id: string): Promise<void>;
}

export const ZONE_REPOSITORY = Symbol('ZONE_REPOSITORY');
