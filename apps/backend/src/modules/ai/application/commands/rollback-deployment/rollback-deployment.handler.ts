import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RollbackDeploymentCommand } from './rollback-deployment.command';
import { DeploymentResponseDto } from '../../../dto/deployment-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IDeploymentRepository } from '../../../domain/repositories/deployment.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(RollbackDeploymentCommand)
export class RollbackDeploymentHandler implements BaseCommandHandler<RollbackDeploymentCommand, DeploymentResponseDto>, ICommandHandler<RollbackDeploymentCommand> {
  constructor(@Inject('IDeploymentRepository') private readonly repository: IDeploymentRepository) {}

  async execute(command: RollbackDeploymentCommand): Promise<DeploymentResponseDto> {
    const dep = await this.repository.findById(command.deploymentId);
    if (!dep) throw new NotFoundException(`Deployment '${command.deploymentId}' not found.`);
    dep.rollback();
    await this.repository.save(dep);
    return DeploymentResponseDto.fromEntity(dep);
  }
}
