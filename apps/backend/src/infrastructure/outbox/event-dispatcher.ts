import { Injectable } from '@nestjs/common';
import { OutboxRepository } from './outbox.repository';
import { TransactionContext } from '../transactions/transaction-context';
import { OutboxEntity } from './outbox.entity';

export interface DomainEvent {
  id: string;
  aggregateType: string;
  aggregateId: string;
  eventType: string;
  payload: any;
  occurredAt: Date;
}

@Injectable()
export class EventDispatcher {
  constructor(private readonly outboxRepository: OutboxRepository) {}

  /**
   * Dispatches an event by saving it to the outbox within the current transaction context.
   */
  public async dispatch(event: DomainEvent, ctx: TransactionContext): Promise<void> {
    const entity: OutboxEntity = {
      id: event.id,
      aggregateType: event.aggregateType,
      aggregateId: event.aggregateId,
      eventType: event.eventType,
      payload: JSON.stringify(event.payload),
      status: 'PENDING',
      retryCount: 0,
      createdAt: event.occurredAt,
    };
    
    await this.outboxRepository.save(entity, ctx);
  }

  /**
   * Dispatches multiple events at once.
   */
  public async dispatchMany(events: DomainEvent[], ctx: TransactionContext): Promise<void> {
    for (const event of events) {
      await this.dispatch(event, ctx);
    }
  }
}
