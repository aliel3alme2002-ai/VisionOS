import { Injectable } from '@nestjs/common';
import { EventMetadata } from '../domain/event-metadata';

@Injectable()
export class CorrelationService {
  enrichMetadata(metadata: EventMetadata): EventMetadata {
    return {
      ...metadata,
      correlationId: metadata.correlationId || ('corr_' + Date.now().toString())
    };
  }
}
