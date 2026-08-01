import { EventMetadata } from './event-metadata';

export interface DomainEvent {
  id: string;
  name: string;
  aggregateId: string;
  aggregateType: string;
  occurredAt: Date;
  payload: Record<string, unknown>;
  metadata: EventMetadata;
}
