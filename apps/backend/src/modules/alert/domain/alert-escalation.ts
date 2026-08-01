export interface AlertEscalation {
  id: string;
  alertId: string;
  escalatedToLevel: number;
  escalatedBy?: string;
  reason: string;
  escalatedAt: Date;
}
