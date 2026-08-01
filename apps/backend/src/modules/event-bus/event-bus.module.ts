import { Module } from '@nestjs/common';
import { EventBusService } from './services/event-bus.service';
import { EventRouterService } from './services/event-router.service';
import { EventPublisherService } from './services/event-publisher.service';
import { EventSubscriberService } from './services/event-subscriber.service';
import { CorrelationService } from './services/correlation.service';
import { IdempotencyService } from './services/idempotency.service';
import { EventValidatorService } from './services/event-validator.service';

import { EVENT_PUBLICATION_REPOSITORY } from './repositories/event-publication.repository';
import { EVENT_SUBSCRIPTION_REPOSITORY } from './repositories/event-subscription.repository';
import { EVENT_BROKER_PROVIDER } from './providers/event-broker.provider';

// Dummy implementation for compilation
const dummyRepository = {
  findById: async () => null,
  findByEventName: async () => [],
  save: async () => {},
  updateStatus: async () => {},
  delete: async () => {}
};

const dummyProvider = {
  publish: async () => true,
  subscribe: async () => {}
};

@Module({
  providers: [
    EventBusService,
    EventRouterService,
    EventPublisherService,
    EventSubscriberService,
    CorrelationService,
    IdempotencyService,
    EventValidatorService,
    
    // Dummy providers for DI to compile without infrastructure
    { provide: EVENT_PUBLICATION_REPOSITORY, useValue: dummyRepository },
    { provide: EVENT_SUBSCRIPTION_REPOSITORY, useValue: dummyRepository },
    { provide: EVENT_BROKER_PROVIDER, useValue: dummyProvider }
  ],
  exports: [
    EventBusService,
    CorrelationService,
    IdempotencyService
  ],
})
export class EventBusModule {}
