import { Module, Global } from '@nestjs/common';
import { TransactionManager } from './transaction-manager';
import { UnitOfWork } from './unit-of-work';

import { OutboxRepository } from '../outbox/outbox.repository';
import { RetryPolicy } from '../outbox/retry-policy';
import { IdempotencyService } from '../outbox/idempotency.service';
import { EventDispatcher } from '../outbox/event-dispatcher';
import { OutboxPublisher } from '../outbox/outbox.publisher';

@Global()
@Module({
  providers: [
    TransactionManager, 
    UnitOfWork,
    OutboxRepository,
    RetryPolicy,
    IdempotencyService,
    EventDispatcher,
    OutboxPublisher,
  ],
  exports: [
    TransactionManager, 
    UnitOfWork,
    OutboxRepository,
    EventDispatcher,
  ],
})
export class TransactionModule {}
