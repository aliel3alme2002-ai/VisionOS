import { EventPublication } from '../domain/event-publication';

export interface EventPublicationRepository {
  findById(id: string): Promise<EventPublication | null>;
  save(publication: EventPublication): Promise<void>;
  updateStatus(id: string, status: string): Promise<void>;
}

export const EVENT_PUBLICATION_REPOSITORY = Symbol('EVENT_PUBLICATION_REPOSITORY');
