import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateCameraCommand } from './update-camera.command';
import { CameraResponseDto } from '../../../dto/camera-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { ICameraRepository } from '../../../domain/repositories/camera.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(UpdateCameraCommand)
export class UpdateCameraHandler implements BaseCommandHandler<UpdateCameraCommand, CameraResponseDto>, ICommandHandler<UpdateCameraCommand> {
  constructor(@Inject('ICameraRepository') private readonly repository: ICameraRepository) {}

  async execute(command: UpdateCameraCommand): Promise<CameraResponseDto> {
    const cam = await this.repository.findById(command.id);
    if (!cam) throw new NotFoundException(`Camera '${command.id}' not found.`);
    cam.update(command.dto.name, command.dto.location, command.dto.ipAddress, command.dto.rtspUrl);
    if (command.dto.groupId !== undefined) cam.assignGroup(command.dto.groupId);
    if (command.dto.streamProfileId !== undefined) cam.assignStreamProfile(command.dto.streamProfileId);
    if (command.dto.credentialId !== undefined) cam.assignCredential(command.dto.credentialId);

    await this.repository.save(cam);
    return CameraResponseDto.fromEntity(cam);
  }
}
