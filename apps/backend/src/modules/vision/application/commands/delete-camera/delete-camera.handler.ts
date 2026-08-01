import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteCameraCommand } from './delete-camera.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { ICameraRepository } from '../../../domain/repositories/camera.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(DeleteCameraCommand)
export class DeleteCameraHandler implements BaseCommandHandler<DeleteCameraCommand, void>, ICommandHandler<DeleteCameraCommand> {
  constructor(@Inject('ICameraRepository') private readonly repository: ICameraRepository) {}

  async execute(command: DeleteCameraCommand): Promise<void> {
    const cam = await this.repository.findById(command.id);
    if (!cam) throw new NotFoundException(`Camera '${command.id}' not found.`);
    cam.delete();
    await this.repository.save(cam);
  }
}
