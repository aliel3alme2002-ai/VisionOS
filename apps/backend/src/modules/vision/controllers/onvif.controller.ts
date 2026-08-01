import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { DiscoverDevicesDto, SyncDeviceDto } from '../dto/device-discovery.dto';
import { DiscoverDevicesCommand } from '../application/commands/discover-devices/discover-devices.command';
import { SyncDeviceCommand } from '../application/commands/sync-device/sync-device.command';

@Controller('vision/onvif')
export class OnvifController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  @Post('discover')
  @HttpCode(HttpStatus.OK)
  async discoverDevices(@Body() dto: DiscoverDevicesDto): Promise<ApiResponse<any[]>> {
    const command = new DiscoverDevicesCommand(dto.subnet);
    const result = await this.commandBus.execute<DiscoverDevicesCommand, any[]>(command);
    return this.success(result);
  }

  @Post('sync')
  @HttpCode(HttpStatus.OK)
  async syncDevice(@Body() dto: SyncDeviceDto): Promise<void> {
    const command = new SyncDeviceCommand(dto.deviceId);
    await this.commandBus.execute(command);
  }
}
