export interface AlertHistory {
  id: string;
  alertId: string;
  userId?: string;
  action: string;
  details: string;
  timestamp: Date;
}
