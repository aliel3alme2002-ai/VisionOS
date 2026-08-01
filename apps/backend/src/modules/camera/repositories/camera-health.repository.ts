import { CameraHealth } from '../domain/camera-health';

export interface CameraHealthRepository {
  findByCamera(cameraId: string): Promise<CameraHealth | null>;
  save(health: CameraHealth): Promise<void>;
}

export const CAMERA_HEALTH_REPOSITORY = Symbol('CAMERA_HEALTH_REPOSITORY');
