import { CameraStatus } from '../value-objects/camera-status';
import { HealthReport } from './health-report';

export class CameraHealth {
  constructor(
    public readonly status: CameraStatus,
    public readonly report: HealthReport,
  ) {}
}
