import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateEdgeNodeCommand } from './update-edge-node.command';
import { EdgeNodeResponseDto } from '../../../dto/edge-node.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IEdgeNodeRepository } from '../../../domain/repositories/edge-node.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(UpdateEdgeNodeCommand)
export class UpdateEdgeNodeHandler implements BaseCommandHandler<UpdateEdgeNodeCommand, EdgeNodeResponseDto>, ICommandHandler<UpdateEdgeNodeCommand> {
  constructor(@Inject('IEdgeNodeRepository') private readonly repository: IEdgeNodeRepository) {}

  async execute(command: UpdateEdgeNodeCommand): Promise<EdgeNodeResponseDto> {
    const edge = await this.repository.findById(command.id);
    if (!edge) throw new NotFoundException(`Edge Node '${command.id}' not found.`);
    await this.repository.save(edge);
    return EdgeNodeResponseDto.fromEntity(edge);
  }
}
