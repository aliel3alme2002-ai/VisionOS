import { Detection } from './detection';

export interface DetectionResult {
  id: string;
  cameraId: string;
  timestamp: Date;
  detections: Detection[];
  imageUrl?: string;
}
