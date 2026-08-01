import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SyncDeviceCommand } from './sync-device.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';

@CommandHandler(SyncDeviceCommand)
export class SyncDeviceHandler implements BaseCommandHandler<SyncDeviceCommand, void>, ICommandHandler<SyncDeviceCommand> {
  async execute(_command: SyncDeviceCommand): Promise<void> {
    // ONVIF / Device Sync logic
  }
}
