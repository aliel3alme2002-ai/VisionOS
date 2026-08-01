import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { RequestContext } from '../common/context/request-context';
import { VisionOSLogger } from '../common/logging/visionos-logger.service';
import { LifecycleService } from './lifecycle.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [RequestContext, VisionOSLogger, LifecycleService],
  exports: [ConfigModule, RequestContext, VisionOSLogger, LifecycleService],
})
export class CoreModule {}
