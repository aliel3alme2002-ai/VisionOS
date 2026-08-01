import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLineCommand } from './create-line.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { Line, LineProps } from '../../../domain/entities/line';
import { randomUUID } from 'crypto';

@CommandHandler(CreateLineCommand)
export class CreateLineHandler implements BaseCommandHandler<CreateLineCommand, Line>, ICommandHandler<CreateLineCommand> {
  async execute(command: CreateLineCommand): Promise<Line> {
    const dto = command.dto;
    const props: LineProps = {
      id: randomUUID(),
      cameraId: dto.cameraId,
      name: dto.name,
      start: dto.start,
      end: dto.end,
    };
    if (dto.direction !== undefined) props.direction = dto.direction;
    return new Line(props);
  }
}
