import { EventMetadata } from './event-metadata';

export interface IntegrationEvent {
  id: string;
  name: string;
  source: string;
  occurredAt: Date;
  payload: Record<string, unknown>;
  metadata: EventMetadata;
}
