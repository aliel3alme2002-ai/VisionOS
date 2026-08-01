import { Injectable, Inject } from '@nestjs/common';
import { Camera } from '../domain/camera';
import { CameraRepository, CAMERA_REPOSITORY } from '../repositories/camera.repository';
import { CameraProvider, CAMERA_PROVIDER } from '../providers/camera.provider';

@Injectable()
export class CameraDomainService {
  constructor(
    @Inject(CAMERA_REPOSITORY) private readonly cameraRepo: CameraRepository,
    // @ts-ignore
    @Inject(CAMERA_PROVIDER) private readonly cameraProvider: CameraProvider
  ) {}

  async registerCamera(camera: Camera): Promise<void> {
    await this.cameraRepo.save(camera);
  }

  async getCamera(id: string): Promise<Camera | null> {
    return this.cameraRepo.findById(id);
  }
}
