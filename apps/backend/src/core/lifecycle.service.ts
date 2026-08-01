import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  OnApplicationShutdown,
  Inject,
} from '@nestjs/common';
import { VisionOSLogger } from '../common/logging/visionos-logger.service';
import { VISIONOS_CONFIG } from '../config/config.constants';
import { VisionOSConfig } from '@visionos/config';

@Injectable()
export class LifecycleService
  implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown
{
  constructor(
    private readonly logger: VisionOSLogger,
    @Inject(VISIONOS_CONFIG) private readonly config: VisionOSConfig,
  ) {}

  onModuleInit(): void {
    this.logger.log(
      `Core infrastructure lifecycle initialized in ${this.config.app.env} mode`,
      'LifecycleService',
    );
  }

  onModuleDestroy(): void {
    this.logger.log(
      'Core infrastructure module destroying...',
      'LifecycleService',
    );
  }

  onApplicationShutdown(signal?: string): void {
    this.logger.log(
      `Application shutting down gracefully with signal: ${signal || 'N/A'}`,
      'LifecycleService',
    );
  }
}
