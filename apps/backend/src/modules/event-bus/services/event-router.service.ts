import { Injectable, Inject } from '@nestjs/common';
import { EventSubscriptionRepository, EVENT_SUBSCRIPTION_REPOSITORY } from '../repositories/event-subscription.repository';
import { EventEnvelope } from '../domain/event-envelope';

@Injectable()
export class EventRouterService {
  constructor(
    @Inject(EVENT_SUBSCRIPTION_REPOSITORY) private readonly subRepo: EventSubscriptionRepository
  ) {}

  async routeEvent(envelope: EventEnvelope<unknown>): Promise<void> {
    const subs = await this.subRepo.findByEventName('dummy'); // Should map from envelope
    
    for (const sub of subs) {
      if (sub.enabled) {
        await sub.handler.handle(envelope.event);
      }
    }
  }
}
