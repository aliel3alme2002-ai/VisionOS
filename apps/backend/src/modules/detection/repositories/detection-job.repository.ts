import { DetectionJob } from '../domain/detection-job';

export interface DetectionJobRepository {
  findById(id: string): Promise<DetectionJob | null>;
  findByCamera(cameraId: string): Promise<DetectionJob[]>;
  save(job: DetectionJob): Promise<void>;
  updateStatus(id: string, status: string): Promise<void>;
}

export const DETECTION_JOB_REPOSITORY = Symbol('DETECTION_JOB_REPOSITORY');
