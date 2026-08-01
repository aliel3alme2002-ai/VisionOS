import { Injectable, Inject } from '@nestjs/common';
import { EdgeRepository, EDGE_REPOSITORY } from '../repositories/edge.repository';
import { CameraRepository, CAMERA_REPOSITORY } from '../repositories/camera.repository';

@Injectable()
export class EdgeAssignmentService {
  constructor(
    // @ts-ignore
    @Inject(EDGE_REPOSITORY) private readonly edgeRepo: EdgeRepository,
    // @ts-ignore
    @Inject(CAMERA_REPOSITORY) private readonly cameraRepo: CameraRepository
  ) {}

  // @ts-ignore
  async assignCameraToEdge(cameraId: string, edgeId: string): Promise<void> {
    // Domain logic for assigning camera to edge node
  }
}
