import { NotificationTemplate } from '../domain/notification-template';

export interface NotificationTemplateRepository {
  findById(id: string): Promise<NotificationTemplate | null>;
  findByName(organizationId: string, name: string): Promise<NotificationTemplate | null>;
  save(template: NotificationTemplate): Promise<void>;
}

export const NOTIFICATION_TEMPLATE_REPOSITORY = Symbol('NOTIFICATION_TEMPLATE_REPOSITORY');
