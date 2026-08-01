import { Module } from '@nestjs/common';
import { CommandBus } from './common/pipeline/command-bus';
import { QueryBus } from './common/pipeline/query-bus';

@Module({
  providers: [CommandBus, QueryBus],
  exports: [CommandBus, QueryBus],
})
export class ApplicationModule {}
