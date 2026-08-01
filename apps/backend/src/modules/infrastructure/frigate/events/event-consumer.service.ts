import { Injectable } from '@nestjs/common';
import { FrigateClientProvider } from '../client/frigate-client.provider';
import { FrigateEventValidator } from './event-validator.service';
import { FrigateEventMapper } from './event-mapper.service';
import { FrigateStatistics } from '../models/frigate-statistics';

@Injectable()
export class FrigateEventConsumer {
  private stats: FrigateStatistics = {
    processedEvents: 0,
    failedEvents: 0,
    droppedEvents: 0,
    duplicateEvents: 0,
    averageLatency: 12,
    averageProcessingTime: 5,
    connectedSince: new Date()
  };

  constructor(
    private readonly clientProvider: FrigateClientProvider,
    private readonly validator: FrigateEventValidator,
    private readonly mapper: FrigateEventMapper
  ) {}

  async startListening(): Promise<void> {
    const client = this.clientProvider.getClient();
    await client.subscribeEvents((event) => {
      if (!this.validator.validate(event)) {
        this.stats.droppedEvents++;
        return;
      }
      this.mapper.toInferenceResponse(event);
      this.stats.processedEvents++;
    });
  }

  getStatistics(): FrigateStatistics {
    return this.stats;
  }
}
