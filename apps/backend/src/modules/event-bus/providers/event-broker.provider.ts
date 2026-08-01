import { EventEnvelope } from '../domain/event-envelope';

export interface EventBrokerProvider {
  publish<T>(envelope: EventEnvelope<T>): Promise<boolean>;
  subscribe(eventName: string, callback: (envelope: EventEnvelope<unknown>) => Promise<void>): Promise<void>;
}

export const EVENT_BROKER_PROVIDER = Symbol('EVENT_BROKER_PROVIDER');
