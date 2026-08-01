import { Module, Global } from '@nestjs/common';
import { configProvider } from './config.provider';
import { VISIONOS_CONFIG } from './config.constants';

@Global()
@Module({
  providers: [configProvider],
  exports: [VISIONOS_CONFIG],
})
export class ConfigModule {}
