import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteCameraGroupCommand } from './delete-camera-group.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { ICameraGroupRepository } from '../../../domain/repositories/camera-group.repository';

@CommandHandler(DeleteCameraGroupCommand)
export class DeleteCameraGroupHandler implements BaseCommandHandler<DeleteCameraGroupCommand, void>, ICommandHandler<DeleteCameraGroupCommand> {
  constructor(@Inject('ICameraGroupRepository') private readonly repository: ICameraGroupRepository) {}

  async execute(command: DeleteCameraGroupCommand): Promise<void> {
    await this.repository.delete(command.id);
  }
}
