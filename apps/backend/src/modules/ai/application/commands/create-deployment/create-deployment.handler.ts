import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateDeploymentCommand } from './create-deployment.command';
import { DeploymentResponseDto } from '../../../dto/deployment-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IDeploymentRepository } from '../../../domain/repositories/deployment.repository';
import { Deployment, DeploymentProps } from '../../../domain/entities/deployment';
import { AiDeploymentService } from '../../../domain/services/ai-deployment.service';
import { randomUUID } from 'crypto';

@CommandHandler(CreateDeploymentCommand)
export class CreateDeploymentHandler implements BaseCommandHandler<CreateDeploymentCommand, DeploymentResponseDto>, ICommandHandler<CreateDeploymentCommand> {
  constructor(
    @Inject('IDeploymentRepository') private readonly repository: IDeploymentRepository,
    private readonly deploymentService: AiDeploymentService,
  ) {}

  async execute(command: CreateDeploymentCommand): Promise<DeploymentResponseDto> {
    const dto = command.dto;
    const isValid = await this.deploymentService.validateDeploymentSlot(dto.runtimeId, dto.deploymentSlotId);
    if (!isValid) {
      throw new Error(`Deployment slot '${dto.deploymentSlotId}' is already occupied by an active deployment.`);
    }

    const props: DeploymentProps = {
      id: randomUUID(),
      modelVersionId: dto.modelVersionId,
      runtimeId: dto.runtimeId,
      deploymentSlotId: dto.deploymentSlotId,
    };
    if (dto.strategy !== undefined) props.strategy = dto.strategy;

    const dep = new Deployment(props);
    await this.repository.save(dep);
    return DeploymentResponseDto.fromEntity(dep);
  }
}
