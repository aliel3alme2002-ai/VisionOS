import { Injectable, Inject } from '@nestjs/common';
import { EventBrokerProvider, EVENT_BROKER_PROVIDER } from '../providers/event-broker.provider';
import { EventPublicationRepository, EVENT_PUBLICATION_REPOSITORY } from '../repositories/event-publication.repository';
import { DomainEvent } from '../domain/domain-event';
import { CorrelationService } from './correlation.service';

@Injectable()
export class EventPublisherService {
  constructor(
    @Inject(EVENT_BROKER_PROVIDER) private readonly broker: EventBrokerProvider,
    @Inject(EVENT_PUBLICATION_REPOSITORY) private readonly pubRepo: EventPublicationRepository,
    private readonly correlation: CorrelationService
  ) {}

  async publishEvent(event: DomainEvent): Promise<void> {
    const envelope = {
      event,
      metadata: this.correlation.enrichMetadata(event.metadata),
      headers: {}
    };
    
    await this.pubRepo.save({
      id: 'pub_' + Date.now().toString(),
      eventName: event.name,
      publishedAt: new Date(),
      status: 'PENDING',
      retryCount: 0
    });
    
    await this.broker.publish(envelope);
  }
}
