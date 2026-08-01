import { CameraGroup } from '../entities/camera-group';

export interface ICameraGroupRepository {
  save(group: CameraGroup): Promise<void>;
  findById(id: string): Promise<CameraGroup | null>;
  findByOrgId(organizationId: string): Promise<CameraGroup[]>;
  delete(id: string): Promise<void>;
}
