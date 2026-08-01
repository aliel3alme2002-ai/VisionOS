import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { GetRuntimeQuery } from '../application/queries/get-runtime/get-runtime.query';

@Controller('ai/health')
export class HealthController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  @Get('runtimes/:id')
  async getRuntimeHealth(@Param('id') id: string): Promise<ApiResponse<any>> {
    const query = new GetRuntimeQuery(id);
    const runtime = await this.queryBus.execute<GetRuntimeQuery, any>(query);
    return this.success({
      runtimeId: runtime.id,
      status: runtime.status,
      latencyMs: runtime.latencyMs,
    });
  }
}
