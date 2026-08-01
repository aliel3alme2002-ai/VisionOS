import { Injectable, Inject } from '@nestjs/common';
import { EventBrokerProvider, EVENT_BROKER_PROVIDER } from '../providers/event-broker.provider';
import { EventSubscriptionRepository, EVENT_SUBSCRIPTION_REPOSITORY } from '../repositories/event-subscription.repository';
import { EventHandler } from '../domain/event-handler';

@Injectable()
export class EventSubscriberService {
  constructor(
    @Inject(EVENT_BROKER_PROVIDER) private readonly broker: EventBrokerProvider,
    @Inject(EVENT_SUBSCRIPTION_REPOSITORY) private readonly subRepo: EventSubscriptionRepository
  ) {}

  async registerHandler(eventName: string, handler: EventHandler<unknown>): Promise<void> {
    await this.subRepo.save({
      id: 'sub_' + Date.now().toString(),
      eventName,
      handler,
      priority: 1,
      enabled: true
    });
    
    await this.broker.subscribe(eventName, async (envelope) => {
      await handler.handle(envelope.event);
    });
  }
}
