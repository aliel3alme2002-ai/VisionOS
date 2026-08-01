import { Injectable, Inject } from '@nestjs/common';
import { DATABASE_CLIENT } from '../database/prisma.module';
import { DatabaseClient } from '../database/database-client.interface';
import { OutboxEntity, OutboxStatus } from './outbox.entity';
import { TransactionContext } from '../transactions/transaction-context';

@Injectable()
export class OutboxRepository {
  constructor(@Inject(DATABASE_CLIENT) private readonly db: DatabaseClient) {}

  /**
   * Save an event to the outbox. Optionally within a transaction context.
   */
  public async save(entity: OutboxEntity, ctx?: TransactionContext): Promise<void> {
    const client = ctx ? ctx.client : this.db;
    
    await client.client.outboxEvent.create({
      data: {
        id: entity.id,
        aggregateType: entity.aggregateType,
        aggregateId: entity.aggregateId,
        eventType: entity.eventType,
        payload: entity.payload,
        status: entity.status,
        retryCount: entity.retryCount,
        createdAt: entity.createdAt,
        publishedAt: entity.publishedAt || null,
      }
    });
  }

  public async findPending(batchSize: number = 50): Promise<OutboxEntity[]> {
    const records = await this.db.client.outboxEvent.findMany({
      where: {
        status: 'PENDING',
      },
      take: batchSize,
      orderBy: { createdAt: 'asc' },
    });
    return records.map((r: any) => this.mapToDomain(r));
  }

  public async markPublished(id: string): Promise<void> {
    await this.db.client.outboxEvent.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });
  }

  public async markFailed(id: string): Promise<void> {
    await this.db.client.outboxEvent.update({
      where: { id },
      data: {
        status: 'FAILED',
      },
    });
  }

  public async incrementRetry(id: string): Promise<void> {
    await this.db.client.outboxEvent.update({
      where: { id },
      data: {
        retryCount: { increment: 1 },
      },
    });
  }

  private mapToDomain(record: any): OutboxEntity {
    return {
      id: record.id,
      aggregateType: record.aggregateType,
      aggregateId: record.aggregateId,
      eventType: record.eventType,
      payload: record.payload,
      status: record.status as OutboxStatus,
      retryCount: record.retryCount,
      createdAt: record.createdAt,
      publishedAt: record.publishedAt || undefined,
    };
  }
}
