import { DetectionResult } from '../domain/detection-result';

export interface DetectionResultRepository {
  findById(id: string): Promise<DetectionResult | null>;
  findByJob(jobId: string): Promise<DetectionResult[]>;
  save(result: DetectionResult): Promise<void>;
}

export const DETECTION_RESULT_REPOSITORY = Symbol('DETECTION_RESULT_REPOSITORY');
