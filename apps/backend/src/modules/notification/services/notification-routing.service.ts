import { Injectable, Inject } from '@nestjs/common';
import { Notification } from '../domain/notification';
import { NotificationRepository, NOTIFICATION_REPOSITORY } from '../repositories/notification.repository';
import { NotificationProvider, NOTIFICATION_PROVIDER } from '../providers/notification-provider';
import { NotificationPreferenceService } from './notification-preference.service';

@Injectable()
export class NotificationRoutingService {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY) private readonly repo: NotificationRepository,
    @Inject(NOTIFICATION_PROVIDER) private readonly provider: NotificationProvider,
    private readonly preferenceService: NotificationPreferenceService
  ) {}

  async route(notification: Notification, recipientId: string): Promise<void> {
    const isAllowed = await this.preferenceService.canSendToRecipient(recipientId, notification.channel);
    if (!isAllowed) {
      await this.repo.updateStatus(notification.id, 'CANCELLED');
      return;
    }

    await this.repo.updateStatus(notification.id, 'QUEUED');

    try {
      const recipient = { id: recipientId, name: 'dummy', address: 'dummy', channel: notification.channel };
      const result = await this.provider.send(notification, recipient);
      
      if (result.success) {
        await this.repo.updateStatus(notification.id, 'SENT');
      } else {
        await this.repo.updateStatus(notification.id, 'FAILED');
      }
    } catch (error) {
      await this.repo.updateStatus(notification.id, 'FAILED');
    }
  }
}
