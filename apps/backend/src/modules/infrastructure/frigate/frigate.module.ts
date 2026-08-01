import { Module } from '@nestjs/common';
import { FrigateAdapter } from './adapter/frigate.adapter';
import { FrigateClientProvider } from './client/frigate-client.provider';
import { ConnectionService } from './connection/connection.service';
import { ConfigurationService } from './configuration/configuration.service';
import { FrigateEventValidator } from './events/event-validator.service';
import { FrigateEventMapper } from './events/event-mapper.service';
import { FrigateEventConsumer } from './events/event-consumer.service';
import { HealthService } from './health/health.service';
import { InferenceService } from './inference/inference.service';
import { SnapshotService } from './media/snapshot.service';
import { ClipService } from './media/clip.service';
import { RecordingService } from './media/recording.service';

@Module({
  providers: [
    FrigateAdapter,
    FrigateClientProvider,
    ConnectionService,
    ConfigurationService,
    FrigateEventValidator,
    FrigateEventMapper,
    FrigateEventConsumer,
    HealthService,
    InferenceService,
    SnapshotService,
    ClipService,
    RecordingService
  ],
  exports: [
    FrigateAdapter,
    FrigateClientProvider,
    FrigateEventConsumer,
    InferenceService,
    HealthService
  ]
})
export class FrigateModule {}
