import { Injectable, Logger } from '@nestjs/common';
import { OutboxRepository } from './outbox.repository';
import { RetryPolicy } from './retry-policy';
import { IdempotencyService } from './idempotency.service';
import { OutboxEntity } from './outbox.entity';

// We inject a generic event bus. Since we don't have the EventBus interface defined yet,
// we'll simulate it for now, or use a dependency. We'll declare a local type.
export interface IEventBus {
  publish(eventType: string, payload: any): Promise<void>;
}

export const EVENT_BUS = Symbol('EVENT_BUS');

@Injectable()
export class OutboxPublisher {
  private readonly logger = new Logger(OutboxPublisher.name);

  constructor(
    private readonly outboxRepository: OutboxRepository,
    private readonly retryPolicy: RetryPolicy,
    private readonly idempotencyService: IdempotencyService,
    // @Inject(EVENT_BUS) private readonly eventBus: IEventBus
  ) {}

  public async processPendingEvents(): Promise<void> {
    const events = await this.outboxRepository.findPending();
    
    if (events.length === 0) {
      return;
    }

    for (const event of events) {
      await this.publishEvent(event);
    }
  }

  private async publishEvent(event: OutboxEntity): Promise<void> {
    const idempotencyKey = `outbox:${event.id}`;
    
    try {
      // Prevent duplicate publishing across distributed workers
      const canProcess = await this.idempotencyService.tryMarkProcessed(idempotencyKey);
      if (!canProcess) {
        this.logger.warn(`Event ${event.id} already processed or in progress.`);
        // Note: we might want to still mark it published if it's stuck in pending,
        // but for now we skip to avoid duplicate publishing.
        return;
      }

      // @ts-ignore
      const payload = JSON.parse(event.payload);
      
      // Simulate event bus publishing
      // await this.eventBus.publish(event.eventType, payload);
      this.logger.log(`[EVENT BUS STUB] Publishing event: ${event.eventType}`);

      await this.outboxRepository.markPublished(event.id);
    } catch (error) {
      this.logger.error(`Failed to publish event ${event.id}`, error);
      await this.handleFailure(event);
    }
  }

  private async handleFailure(event: OutboxEntity): Promise<void> {
    if (this.retryPolicy.shouldRetry(event.retryCount)) {
      await this.outboxRepository.incrementRetry(event.id);
      
      // In a real system, you might want to delay processing this event using backoff.
      // Here, it just increments retry and leaves it PENDING to be picked up next time.
    } else {
      await this.outboxRepository.markFailed(event.id);
      this.logger.error(`Event ${event.id} moved to dead letter (max retries exceeded).`);
    }
  }
}
