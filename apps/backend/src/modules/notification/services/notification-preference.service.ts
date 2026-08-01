import { Injectable } from '@nestjs/common';
import { NotificationChannel } from '../domain/notification-channel';

@Injectable()
export class NotificationPreferenceService {
  async canSendToRecipient(recipientId: string, channel: NotificationChannel): Promise<boolean> {
    if (!recipientId || !channel) return false;
    // Dummy business rule
    return true;
  }
}
