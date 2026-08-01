import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { CreateStreamProfileDto, StreamProfileResponseDto } from '../dto/stream-profile.dto';
import { CreateStreamProfileCommand } from '../application/commands/create-stream-profile/create-stream-profile.command';

@Controller('vision/streams')
export class StreamsController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  @Post('profiles')
  @HttpCode(HttpStatus.CREATED)
  async createProfile(@Body() dto: CreateStreamProfileDto): Promise<ApiResponse<StreamProfileResponseDto>> {
    const command = new CreateStreamProfileCommand(dto);
    const result = await this.commandBus.execute<CreateStreamProfileCommand, StreamProfileResponseDto>(command);
    return this.success(result);
  }
}
