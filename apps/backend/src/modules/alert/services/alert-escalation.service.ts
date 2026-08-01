import { Injectable, Inject } from '@nestjs/common';
import { AlertRepository, ALERT_REPOSITORY } from '../repositories/alert.repository';
import { AlertHistoryRepository, ALERT_HISTORY_REPOSITORY } from '../repositories/alert-history.repository';

@Injectable()
export class AlertEscalationService {
  constructor(
    @Inject(ALERT_REPOSITORY) private readonly alertRepo: AlertRepository,
    @Inject(ALERT_HISTORY_REPOSITORY) private readonly historyRepo: AlertHistoryRepository
  ) {}

  async escalate(alertId: string, level: number, reason: string): Promise<void> {
    if (level < 1) return;
    await this.alertRepo.updateStatus(alertId, 'ESCALATED');
    await this.historyRepo.save({
      id: 'hist_' + Date.now().toString(),
      alertId,
      action: 'ESCALATION',
      details: reason,
      timestamp: new Date()
    });
  }
}
