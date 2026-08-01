import { EventSubscription } from '../domain/event-subscription';

export interface EventSubscriptionRepository {
  findByEventName(eventName: string): Promise<EventSubscription[]>;
  save(subscription: EventSubscription): Promise<void>;
  delete(id: string): Promise<void>;
}

export const EVENT_SUBSCRIPTION_REPOSITORY = Symbol('EVENT_SUBSCRIPTION_REPOSITORY');
