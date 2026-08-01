import { Injectable } from '@nestjs/common';
import { NotificationRequest } from '../domain/notification-request';

@Injectable()
export class NotificationValidatorService {
  isValidRequest(request: NotificationRequest): boolean {
    if (!request.organizationId || !request.recipientId) return false;
    if (!request.title || !request.body) return false;
    return true;
  }
}
