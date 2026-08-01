import { Camera } from '../domain/camera';

export interface CameraRepository {
  findById(id: string): Promise<Camera | null>;
  findByOrganization(organizationId: string): Promise<Camera[]>;
  save(camera: Camera): Promise<void>;
  delete(id: string): Promise<void>;
}

export const CAMERA_REPOSITORY = Symbol('CAMERA_REPOSITORY');
