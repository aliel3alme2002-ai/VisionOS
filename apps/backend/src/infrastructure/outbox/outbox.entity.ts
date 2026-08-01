export type OutboxStatus = 'PENDING' | 'PUBLISHING' | 'PUBLISHED' | 'FAILED';

export interface OutboxEntity {
  id: string;
  aggregateType: string;
  aggregateId: string;
  eventType: string;
  payload: string;
  status: OutboxStatus;
  retryCount: number;
  createdAt: Date;
  publishedAt?: Date;
}
