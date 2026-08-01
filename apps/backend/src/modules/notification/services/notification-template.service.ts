import { Injectable, Inject } from '@nestjs/common';
import { NotificationTemplateRepository, NOTIFICATION_TEMPLATE_REPOSITORY } from '../repositories/notification-template.repository';
import { NotificationTemplate } from '../domain/notification-template';

@Injectable()
export class NotificationTemplateService {
  constructor(
    @Inject(NOTIFICATION_TEMPLATE_REPOSITORY) private readonly repo: NotificationTemplateRepository
  ) {}

  async getTemplate(organizationId: string, name: string): Promise<NotificationTemplate | null> {
    return this.repo.findByName(organizationId, name);
  }
}
