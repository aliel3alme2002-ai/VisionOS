import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateModelCommand } from './create-model.command';
import { ModelResponseDto } from '../../../dto/model-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IAiModelRepository } from '../../../domain/repositories/ai-model.repository';
import { AiModel, AiModelProps } from '../../../domain/entities/ai-model';
import { randomUUID } from 'crypto';

@CommandHandler(CreateModelCommand)
export class CreateModelHandler implements BaseCommandHandler<CreateModelCommand, ModelResponseDto>, ICommandHandler<CreateModelCommand> {
  constructor(@Inject('IAiModelRepository') private readonly repository: IAiModelRepository) {}

  async execute(command: CreateModelCommand): Promise<ModelResponseDto> {
    const dto = command.dto;
    const props: AiModelProps = {
      id: randomUUID(),
      organizationId: dto.organizationId,
      name: dto.name,
      framework: dto.framework,
      task: dto.task,
      inputShape: dto.inputShape,
      outputShape: dto.outputShape,
    };
    if (dto.description !== undefined) props.description = dto.description;

    const model = new AiModel(props);
    await this.repository.save(model);
    return ModelResponseDto.fromEntity(model);
  }
}
