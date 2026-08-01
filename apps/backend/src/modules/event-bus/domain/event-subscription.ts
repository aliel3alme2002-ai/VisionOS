import { EventHandler } from './event-handler';

export interface EventSubscription {
  id: string;
  eventName: string;
  handler: EventHandler<unknown>;
  priority: number;
  enabled: boolean;
}
