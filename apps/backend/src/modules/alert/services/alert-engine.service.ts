import { Injectable, Inject } from '@nestjs/common';
import { AlertRepository, ALERT_REPOSITORY } from '../repositories/alert.repository';
import { Alert } from '../domain/alert';
import { AlertValidatorService } from './alert-validator.service';

@Injectable()
export class AlertEngineService {
  constructor(
    @Inject(ALERT_REPOSITORY) private readonly alertRepo: AlertRepository,
    private readonly validator: AlertValidatorService
  ) {}

  async createAlert(alert: Alert): Promise<void> {
    if (this.validator.isValid(alert)) {
      await this.alertRepo.save(alert);
    }
  }
}
