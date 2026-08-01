import { Injectable, Inject } from '@nestjs/common';
import { AlertRepository, ALERT_REPOSITORY } from '../repositories/alert.repository';

@Injectable()
export class AlertLifecycleService {
  constructor(
    @Inject(ALERT_REPOSITORY) private readonly alertRepo: AlertRepository
  ) {}

  async acknowledge(alertId: string, userId: string): Promise<void> {
    if (!userId) return;
    const alert = await this.alertRepo.findById(alertId);
    if (alert && alert.status === 'OPEN') {
      await this.alertRepo.updateStatus(alertId, 'ACKNOWLEDGED');
    }
  }

  async resolve(alertId: string, userId: string): Promise<void> {
    if (!userId) return;
    await this.alertRepo.updateStatus(alertId, 'RESOLVED');
  }

  async close(alertId: string, userId: string): Promise<void> {
    if (!userId) return;
    await this.alertRepo.updateStatus(alertId, 'CLOSED');
  }
}
