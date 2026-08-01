import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MoveCameraCommand } from './move-camera.command';
import { CameraResponseDto } from '../../../dto/camera-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { ICameraRepository } from '../../../domain/repositories/camera.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(MoveCameraCommand)
export class MoveCameraHandler implements BaseCommandHandler<MoveCameraCommand, CameraResponseDto>, ICommandHandler<MoveCameraCommand> {
  constructor(@Inject('ICameraRepository') private readonly repository: ICameraRepository) {}

  async execute(command: MoveCameraCommand): Promise<CameraResponseDto> {
    const cam = await this.repository.findById(command.cameraId);
    if (!cam) throw new NotFoundException(`Camera '${command.cameraId}' not found.`);
    cam.moveToEdge(command.targetEdgeNodeId);
    await this.repository.save(cam);
    return CameraResponseDto.fromEntity(cam);
  }
}
