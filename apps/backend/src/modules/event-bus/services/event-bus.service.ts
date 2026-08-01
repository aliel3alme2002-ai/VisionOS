import { Injectable } from '@nestjs/common';
import { EventPublisherService } from './event-publisher.service';
import { EventSubscriberService } from './event-subscriber.service';
import { DomainEvent } from '../domain/domain-event';
import { EventHandler } from '../domain/event-handler';

@Injectable()
export class EventBusService {
  constructor(
    private readonly publisher: EventPublisherService,
    private readonly subscriber: EventSubscriberService
  ) {}

  async publish(event: DomainEvent): Promise<void> {
    await this.publisher.publishEvent(event);
  }

  async subscribe(eventName: string, handler: EventHandler<unknown>): Promise<void> {
    await this.subscriber.registerHandler(eventName, handler);
  }
}
