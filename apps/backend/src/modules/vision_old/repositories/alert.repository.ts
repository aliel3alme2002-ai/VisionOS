import { Alert } from '../domain/alert';

export interface AlertRepository {
  findById(id: string): Promise<Alert | null>;
  findByCamera(cameraId: string): Promise<Alert[]>;
  save(alert: Alert): Promise<void>;
  delete(id: string): Promise<void>;
}

export const ALERT_REPOSITORY = Symbol('ALERT_REPOSITORY');
