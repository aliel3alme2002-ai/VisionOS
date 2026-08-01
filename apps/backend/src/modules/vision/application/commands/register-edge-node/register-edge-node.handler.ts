import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterEdgeNodeCommand } from './register-edge-node.command';
import { EdgeNodeResponseDto } from '../../../dto/edge-node.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IEdgeNodeRepository } from '../../../domain/repositories/edge-node.repository';
import { EdgeNode, EdgeNodeProps } from '../../../domain/entities/edge-node';
import { randomUUID } from 'crypto';

@CommandHandler(RegisterEdgeNodeCommand)
export class RegisterEdgeNodeHandler implements BaseCommandHandler<RegisterEdgeNodeCommand, EdgeNodeResponseDto>, ICommandHandler<RegisterEdgeNodeCommand> {
  constructor(@Inject('IEdgeNodeRepository') private readonly repository: IEdgeNodeRepository) {}

  async execute(command: RegisterEdgeNodeCommand): Promise<EdgeNodeResponseDto> {
    const props: EdgeNodeProps = {
      id: randomUUID(),
      organizationId: command.dto.organizationId,
      name: command.dto.name,
      hostname: command.dto.hostname,
      ipAddress: command.dto.ipAddress,
    };
    if (command.dto.version !== undefined) props.version = command.dto.version;

    const edge = EdgeNode.register(props);
    await this.repository.save(edge);
    return EdgeNodeResponseDto.fromEntity(edge);
  }
}
