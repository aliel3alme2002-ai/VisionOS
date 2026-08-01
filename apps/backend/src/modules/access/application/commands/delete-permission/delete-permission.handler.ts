import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePermissionCommand } from './delete-permission.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';

@CommandHandler(DeletePermissionCommand)
export class DeletePermissionHandler implements BaseCommandHandler<DeletePermissionCommand, void>, ICommandHandler<DeletePermissionCommand> {
  async execute(_command: DeletePermissionCommand): Promise<void> {
    // Soft delete logic for permissions if needed
  }
}
