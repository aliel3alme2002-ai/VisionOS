import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateStreamProfileCommand } from './create-stream-profile.command';
import { StreamProfileResponseDto } from '../../../dto/stream-profile.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IStreamProfileRepository } from '../../../domain/repositories/stream-profile.repository';
import { StreamProfile, StreamProfileProps } from '../../../domain/entities/stream-profile';
import { randomUUID } from 'crypto';

@CommandHandler(CreateStreamProfileCommand)
export class CreateStreamProfileHandler implements BaseCommandHandler<CreateStreamProfileCommand, StreamProfileResponseDto>, ICommandHandler<CreateStreamProfileCommand> {
  constructor(@Inject('IStreamProfileRepository') private readonly repository: IStreamProfileRepository) {}

  async execute(command: CreateStreamProfileCommand): Promise<StreamProfileResponseDto> {
    const props: StreamProfileProps = {
      id: randomUUID(),
      name: command.dto.name,
    };
    if (command.dto.codec !== undefined) props.codec = command.dto.codec;
    if (command.dto.resolution !== undefined) props.resolution = command.dto.resolution;
    if (command.dto.fps !== undefined) props.fps = command.dto.fps;
    if (command.dto.bitrate !== undefined) props.bitrate = command.dto.bitrate;
    if (command.dto.transport !== undefined) props.transport = command.dto.transport;

    const sp = new StreamProfile(props);
    await this.repository.save(sp);
    return StreamProfileResponseDto.fromEntity(sp);
  }
}
