import { Module } from '@nestjs/common';
import { NotificationEngineService } from './services/notification-engine.service';
import { NotificationRoutingService } from './services/notification-routing.service';
import { NotificationTemplateService } from './services/notification-template.service';
import { NotificationPreferenceService } from './services/notification-preference.service';
import { NotificationValidatorService } from './services/notification-validator.service';

import { NOTIFICATION_REPOSITORY } from './repositories/notification.repository';
import { NOTIFICATION_TEMPLATE_REPOSITORY } from './repositories/notification-template.repository';
import { NOTIFICATION_PROVIDER } from './providers/notification-provider';

// Dummy implementation for compilation
const dummyRepository = {
  findById: async () => null,
  findByName: async () => null,
  save: async () => {},
  updateStatus: async () => {}
};

const dummyProvider = {
  send: async () => ({ notificationId: 'none', success: true, providerResponse: 'ok' })
};

@Module({
  providers: [
    NotificationEngineService,
    NotificationRoutingService,
    NotificationTemplateService,
    NotificationPreferenceService,
    NotificationValidatorService,
    
    // Dummy providers for DI to compile without infrastructure
    { provide: NOTIFICATION_REPOSITORY, useValue: dummyRepository },
    { provide: NOTIFICATION_TEMPLATE_REPOSITORY, useValue: dummyRepository },
    { provide: NOTIFICATION_PROVIDER, useValue: dummyProvider }
  ],
  exports: [
    NotificationEngineService,
    NotificationTemplateService,
    NotificationPreferenceService
  ],
})
export class NotificationModule {}
