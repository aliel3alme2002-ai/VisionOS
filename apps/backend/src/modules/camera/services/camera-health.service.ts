import { Injectable, Inject } from '@nestjs/common';
import { CameraHealth } from '../domain/camera-health';
import { CameraHealthRepository, CAMERA_HEALTH_REPOSITORY } from '../repositories/camera-health.repository';

@Injectable()
export class CameraHealthService {
  constructor(
    @Inject(CAMERA_HEALTH_REPOSITORY) private readonly healthRepo: CameraHealthRepository
  ) {}

  async updateHealth(health: CameraHealth): Promise<void> {
    await this.healthRepo.save(health);
  }

  async getHealth(cameraId: string): Promise<CameraHealth | null> {
    return this.healthRepo.findByCamera(cameraId);
  }
}
