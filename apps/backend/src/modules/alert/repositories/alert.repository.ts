import { Alert } from '../domain/alert';

export interface AlertRepository {
  findById(id: string): Promise<Alert | null>;
  findByOrganization(organizationId: string): Promise<Alert[]>;
  save(alert: Alert): Promise<void>;
  updateStatus(id: string, status: string): Promise<void>;
}

export const ALERT_REPOSITORY = Symbol('ALERT_REPOSITORY');
