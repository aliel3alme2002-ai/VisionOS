import { EventMetadata } from './event-metadata';

export interface EventEnvelope<T> {
  event: T;
  metadata: EventMetadata;
  headers: Record<string, string>;
}
