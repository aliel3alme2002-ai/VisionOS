import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreatePipelineCommand } from './create-pipeline.command';
import { PipelineResponseDto } from '../../../dto/pipeline-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IPipelineRepository } from '../../../domain/repositories/pipeline.repository';
import { Pipeline, PipelineProps } from '../../../domain/entities/pipeline';
import { PipelineStage } from '../../../domain/entities/pipeline-stage';
import { randomUUID } from 'crypto';

@CommandHandler(CreatePipelineCommand)
export class CreatePipelineHandler implements BaseCommandHandler<CreatePipelineCommand, PipelineResponseDto>, ICommandHandler<CreatePipelineCommand> {
  constructor(@Inject('IPipelineRepository') private readonly repository: IPipelineRepository) {}

  async execute(command: CreatePipelineCommand): Promise<PipelineResponseDto> {
    const dto = command.dto;
    const props: PipelineProps = {
      id: randomUUID(),
      organizationId: dto.organizationId,
      name: dto.name,
      runtimeId: dto.runtimeId,
    };
    if (dto.description !== undefined) props.description = dto.description;

    const pipeline = new Pipeline(props);
    if (dto.stages) {
      for (const st of dto.stages) {
        pipeline.addStage(new PipelineStage(st));
      }
    }

    await this.repository.save(pipeline);
    return PipelineResponseDto.fromEntity(pipeline);
  }
}
