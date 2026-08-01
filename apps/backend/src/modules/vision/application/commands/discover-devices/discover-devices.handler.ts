import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DiscoverDevicesCommand } from './discover-devices.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { VisionDiscoveryService } from '../../../domain/services/vision-discovery.service';

@CommandHandler(DiscoverDevicesCommand)
export class DiscoverDevicesHandler implements BaseCommandHandler<DiscoverDevicesCommand, any[]>, ICommandHandler<DiscoverDevicesCommand> {
  constructor(private readonly discoveryService: VisionDiscoveryService) {}

  async execute(command: DiscoverDevicesCommand): Promise<any[]> {
    return this.discoveryService.scanNetwork(command.subnet);
  }
}
