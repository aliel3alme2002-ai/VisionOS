import { Injectable, Inject } from '@nestjs/common';
import { CameraConfiguration } from '../domain/camera-configuration';
import { CameraConfigurationRepository, CAMERA_CONFIGURATION_REPOSITORY } from '../repositories/camera-configuration.repository';

@Injectable()
export class CameraManagementService {
  constructor(
    @Inject(CAMERA_CONFIGURATION_REPOSITORY) private readonly configRepo: CameraConfigurationRepository
  ) {}

  async registerCamera(config: CameraConfiguration): Promise<void> {
    await this.configRepo.save(config);
  }

  async updateCamera(config: CameraConfiguration): Promise<void> {
    await this.configRepo.save(config);
  }

  async removeCamera(cameraId: string): Promise<void> {
    await this.configRepo.delete(cameraId);
  }

  async enable(cameraId: string): Promise<void> {
    const config = await this.configRepo.findById(cameraId);
    if (config) {
      // enable logic
    }
  }

  async disable(cameraId: string): Promise<void> {
    const config = await this.configRepo.findById(cameraId);
    if (config) {
      // disable logic
    }
  }
}
