import { Controller, Post, Get, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { RegisterRuntimeDto } from '../dto/register-runtime.dto';
import { RuntimeResponseDto } from '../dto/runtime-response.dto';

import { RegisterRuntimeCommand } from '../application/commands/register-runtime/register-runtime.command';
import { GetRuntimeQuery } from '../application/queries/get-runtime/get-runtime.query';
import { GetGpuDevicesQuery } from '../application/queries/get-gpu-devices/get-gpu-devices.query';

@Controller('ai/runtime')
export class RuntimeController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterRuntimeDto): Promise<ApiResponse<RuntimeResponseDto>> {
    const command = new RegisterRuntimeCommand(dto);
    const result = await this.commandBus.execute<RegisterRuntimeCommand, RuntimeResponseDto>(command);
    return this.success(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApiResponse<RuntimeResponseDto>> {
    const query = new GetRuntimeQuery(id);
    const result = await this.queryBus.execute<GetRuntimeQuery, RuntimeResponseDto>(query);
    return this.success(result);
  }

  @Get(':id/gpus')
  async getGpus(@Param('id') id: string): Promise<ApiResponse<any[]>> {
    const query = new GetGpuDevicesQuery(id);
    const result = await this.queryBus.execute<GetGpuDevicesQuery, any[]>(query);
    return this.success(result);
  }
}
