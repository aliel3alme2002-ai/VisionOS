import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { EdgeHeartbeatCommand } from './edge-heartbeat.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IEdgeNodeRepository } from '../../../domain/repositories/edge-node.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(EdgeHeartbeatCommand)
export class EdgeHeartbeatHandler implements BaseCommandHandler<EdgeHeartbeatCommand, void>, ICommandHandler<EdgeHeartbeatCommand> {
  constructor(@Inject('IEdgeNodeRepository') private readonly repository: IEdgeNodeRepository) {}

  async execute(command: EdgeHeartbeatCommand): Promise<void> {
    const edge = await this.repository.findById(command.edgeNodeId);
    if (!edge) throw new NotFoundException(`Edge Node '${command.edgeNodeId}' not found.`);
    edge.recordHeartbeat();
    await this.repository.save(edge);
  }
}
