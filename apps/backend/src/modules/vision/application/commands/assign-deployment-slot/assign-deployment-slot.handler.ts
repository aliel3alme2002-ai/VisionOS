import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignDeploymentSlotCommand } from './assign-deployment-slot.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IEdgeNodeRepository } from '../../../domain/repositories/edge-node.repository';
import { DeploymentSlot } from '../../../domain/entities/deployment-slot';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';
import { randomUUID } from 'crypto';

@CommandHandler(AssignDeploymentSlotCommand)
export class AssignDeploymentSlotHandler implements BaseCommandHandler<AssignDeploymentSlotCommand, void>, ICommandHandler<AssignDeploymentSlotCommand> {
  constructor(@Inject('IEdgeNodeRepository') private readonly repository: IEdgeNodeRepository) {}

  async execute(command: AssignDeploymentSlotCommand): Promise<void> {
    const edge = await this.repository.findById(command.edgeNodeId);
    if (!edge) throw new NotFoundException(`Edge Node '${command.edgeNodeId}' not found.`);
    const slot = new DeploymentSlot({
      id: randomUUID(),
      edgeNodeId: edge.id,
      slotNumber: command.slotNumber,
      runtime: command.runtime,
    });
    edge.addDeploymentSlot(slot);
    await this.repository.save(edge);
  }
}
