import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateCameraGroupCommand } from './update-camera-group.command';
import { CameraGroupResponseDto } from '../../../dto/camera-group.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { ICameraGroupRepository } from '../../../domain/repositories/camera-group.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(UpdateCameraGroupCommand)
export class UpdateCameraGroupHandler implements BaseCommandHandler<UpdateCameraGroupCommand, CameraGroupResponseDto>, ICommandHandler<UpdateCameraGroupCommand> {
  constructor(@Inject('ICameraGroupRepository') private readonly repository: ICameraGroupRepository) {}

  async execute(command: UpdateCameraGroupCommand): Promise<CameraGroupResponseDto> {
    const group = await this.repository.findById(command.id);
    if (!group) throw new NotFoundException(`Camera Group '${command.id}' not found.`);
    group.update(command.name, command.description);
    await this.repository.save(group);
    return CameraGroupResponseDto.fromEntity(group);
  }
}
