import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { ScheduleJobDto } from '../dto/schedule-job.dto';
import { ScheduleJobCommand } from '../application/commands/schedule-job/schedule-job.command';

@Controller('ai/scheduler')
export class SchedulerController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  @Post('jobs')
  @HttpCode(HttpStatus.CREATED)
  async scheduleJob(@Body() dto: ScheduleJobDto): Promise<ApiResponse<any>> {
    const command = new ScheduleJobCommand(dto);
    const result = await this.commandBus.execute<ScheduleJobCommand, any>(command);
    return this.success(result);
  }
}
