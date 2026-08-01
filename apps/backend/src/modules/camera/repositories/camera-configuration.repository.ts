import { CameraConfiguration } from '../domain/camera-configuration';

export interface CameraConfigurationRepository {
  findById(id: string): Promise<CameraConfiguration | null>;
  findByOrganization(organizationId: string): Promise<CameraConfiguration[]>;
  save(config: CameraConfiguration): Promise<void>;
  delete(id: string): Promise<void>;
}

export const CAMERA_CONFIGURATION_REPOSITORY = Symbol('CAMERA_CONFIGURATION_REPOSITORY');
