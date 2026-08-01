import { AlertSeverity } from '../enums/alert-severity';

export interface Alert {
  id: string;
  severity: AlertSeverity;
  source: string;
  cameraId: string;
  detectionId?: string;
  message: string;
  acknowledged: boolean;
  createdAt: Date;
}
