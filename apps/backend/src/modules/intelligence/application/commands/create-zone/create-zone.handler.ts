import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateZoneCommand } from './create-zone.command';
import { ZoneResponseDto } from '../../../dto/zone-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IZoneRepository } from '../../../domain/repositories/zone.repository';
import { Zone, ZoneProps } from '../../../domain/entities/zone';
import { ZoneType } from '../../../domain/value-objects/zone-type';
import { randomUUID } from 'crypto';

@CommandHandler(CreateZoneCommand)
export class CreateZoneHandler implements BaseCommandHandler<CreateZoneCommand, ZoneResponseDto>, ICommandHandler<CreateZoneCommand> {
  constructor(@Inject('IZoneRepository') private readonly repository: IZoneRepository) {}

  async execute(command: CreateZoneCommand): Promise<ZoneResponseDto> {
    const dto = command.dto;
    const type = dto.type ? ZoneType.create(dto.type) : ZoneType.detection();
    const props: ZoneProps = {
      id: randomUUID(),
      organizationId: dto.organizationId,
      cameraId: dto.cameraId,
      name: dto.name,
      polygon: dto.polygon,
      type,
    };
    const zone = new Zone(props);
    await this.repository.save(zone);
    return ZoneResponseDto.fromEntity(zone);
  }
}
