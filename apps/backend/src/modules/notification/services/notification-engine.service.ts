import { Injectable, Inject } from '@nestjs/common';
import { NotificationRequest } from '../domain/notification-request';
import { NotificationRepository, NOTIFICATION_REPOSITORY } from '../repositories/notification.repository';
import { NotificationValidatorService } from './notification-validator.service';
import { NotificationRoutingService } from './notification-routing.service';
import { Notification } from '../domain/notification';

@Injectable()
export class NotificationEngineService {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY) private readonly repo: NotificationRepository,
    private readonly validator: NotificationValidatorService,
    private readonly router: NotificationRoutingService
  ) {}

  async processRequest(request: NotificationRequest): Promise<string | null> {
    if (!this.validator.isValidRequest(request)) return null;

    const notificationId = 'notif_' + Date.now().toString();
    const notification: Notification = {
      id: notificationId,
      organizationId: request.organizationId,
      title: request.title,
      body: request.body,
      channel: request.channel,
      status: 'CREATED',
      priority: request.priority,
      createdAt: new Date()
    };

    await this.repo.save(notification);
    
    // Fire and forget routing logic
    this.router.route(notification, request.recipientId).catch(() => {});
    
    return notificationId;
  }
}
