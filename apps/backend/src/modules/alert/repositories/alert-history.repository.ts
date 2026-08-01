import { AlertHistory } from '../domain/alert-history';

export interface AlertHistoryRepository {
  findByAlert(alertId: string): Promise<AlertHistory[]>;
  save(history: AlertHistory): Promise<void>;
}

export const ALERT_HISTORY_REPOSITORY = Symbol('ALERT_HISTORY_REPOSITORY');
