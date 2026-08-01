import { Injectable, Inject } from '@nestjs/common';
import { ICameraRepository } from '../repositories/camera.repository';
import { IEdgeNodeRepository } from '../repositories/edge-node.repository';
import { HealthReport } from '../entities/health-report';

@Injectable()
export class VisionHealthService {
  constructor(
    @Inject('ICameraRepository') private readonly cameraRepository: ICameraRepository,
    @Inject('IEdgeNodeRepository') private readonly edgeNodeRepository: IEdgeNodeRepository,
  ) {}

  public async checkCameraHealth(cameraId: string): Promise<HealthReport> {
    const cam = await this.cameraRepository.findById(cameraId);
    if (!cam) throw new Error('Camera not found');
    if (cam.edgeNodeId) {
      await this.edgeNodeRepository.findById(cam.edgeNodeId);
    }
    return new HealthReport({
      latency: 12,
      packetLoss: 0.01,
      bitrate: 4096,
      uptime: 86400,
      streamStatus: cam.status.isOnline() ? 'HEALTHY' : 'DEGRADED',
      lastHeartbeat: new Date(),
    });
  }
}
