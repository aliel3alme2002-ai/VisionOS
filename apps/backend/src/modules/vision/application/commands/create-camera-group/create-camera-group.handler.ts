import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateCameraGroupCommand } from './create-camera-group.command';
import { CameraGroupResponseDto } from '../../../dto/camera-group.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { ICameraGroupRepository } from '../../../domain/repositories/camera-group.repository';
import { CameraGroup, CameraGroupProps } from '../../../domain/entities/camera-group';
import { randomUUID } from 'crypto';

@CommandHandler(CreateCameraGroupCommand)
export class CreateCameraGroupHandler implements BaseCommandHandler<CreateCameraGroupCommand, CameraGroupResponseDto>, ICommandHandler<CreateCameraGroupCommand> {
  constructor(@Inject('ICameraGroupRepository') private readonly repository: ICameraGroupRepository) {}

  async execute(command: CreateCameraGroupCommand): Promise<CameraGroupResponseDto> {
    const props: CameraGroupProps = {
      id: randomUUID(),
      organizationId: command.dto.organizationId,
      name: command.dto.name,
    };
    if (command.dto.description !== undefined) props.description = command.dto.description;
    const group = new CameraGroup(props);
    await this.repository.save(group);
    return CameraGroupResponseDto.fromEntity(group);
  }
}
