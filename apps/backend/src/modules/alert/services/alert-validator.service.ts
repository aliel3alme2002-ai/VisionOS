import { Injectable } from '@nestjs/common';
import { Alert } from '../domain/alert';

@Injectable()
export class AlertValidatorService {
  isValid(alert: Alert): boolean {
    if (!alert.title || !alert.organizationId) {
      return false;
    }
    return true;
  }
}
