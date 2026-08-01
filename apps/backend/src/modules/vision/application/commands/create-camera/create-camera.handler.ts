import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateCameraCommand } from './create-camera.command';
import { CameraResponseDto } from '../../../dto/camera-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { ICameraRepository } from '../../../domain/repositories/camera.repository';
import { Camera, CameraProps } from '../../../domain/entities/camera';
import { randomUUID } from 'crypto';

@CommandHandler(CreateCameraCommand)
export class CreateCameraHandler implements BaseCommandHandler<CreateCameraCommand, CameraResponseDto>, ICommandHandler<CreateCameraCommand> {
  constructor(@Inject('ICameraRepository') private readonly repository: ICameraRepository) {}

  async execute(command: CreateCameraCommand): Promise<CameraResponseDto> {
    const dto = command.dto;
    const props: CameraProps = {
      id: randomUUID(),
      organizationId: dto.organizationId,
      name: dto.name,
      ipAddress: dto.ipAddress,
      rtspUrl: dto.rtspUrl,
    };
    if (dto.location !== undefined) props.location = dto.location;
    if (dto.groupId !== undefined) props.groupId = dto.groupId;
    if (dto.manufacturer !== undefined) props.manufacturer = dto.manufacturer;
    if (dto.model !== undefined) props.model = dto.model;
    if (dto.serialNumber !== undefined) props.serialNumber = dto.serialNumber;
    if (dto.firmwareVersion !== undefined) props.firmwareVersion = dto.firmwareVersion;
    if (dto.macAddress !== undefined) props.macAddress = dto.macAddress;
    if (dto.onvifEnabled !== undefined) props.onvifEnabled = dto.onvifEnabled;
    if (dto.streamProfileId !== undefined) props.streamProfileId = dto.streamProfileId;
    if (dto.credentialId !== undefined) props.credentialId = dto.credentialId;
    if (dto.edgeNodeId !== undefined) props.edgeNodeId = dto.edgeNodeId;

    const camera = Camera.create(props);
    await this.repository.save(camera);
    return CameraResponseDto.fromEntity(camera);
  }
}
