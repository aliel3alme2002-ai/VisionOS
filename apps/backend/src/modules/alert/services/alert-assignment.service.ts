import { Injectable, Inject } from '@nestjs/common';
import { AlertRepository, ALERT_REPOSITORY } from '../repositories/alert.repository';

@Injectable()
export class AlertAssignmentService {
  constructor(
    @Inject(ALERT_REPOSITORY) private readonly alertRepo: AlertRepository
  ) {}

  async assign(alertId: string, userId: string, assignedBy: string): Promise<void> {
    if (!userId || !assignedBy) return;
    await this.alertRepo.updateStatus(alertId, 'ASSIGNED');
  }
}
