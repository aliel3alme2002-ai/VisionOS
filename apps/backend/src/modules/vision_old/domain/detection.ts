import { DetectionType } from '../enums/detection-type';
import { DetectionStatus } from '../enums/detection-status';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Detection {
  id: string;
  cameraId: string;
  modelId: string;
  type: DetectionType;
  confidence: number;
  box: BoundingBox;
  status: DetectionStatus;
  timestamp: Date;
}
