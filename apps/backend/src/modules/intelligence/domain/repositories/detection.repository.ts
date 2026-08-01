import { Detection } from '../entities/detection';

export interface IDetectionRepository {
  save(detection: Detection): Promise<void>;
  findById(id: string): Promise<Detection | null>;
  findByCameraId(cameraId: string): Promise<Detection[]>;
}
