import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateModelVersionCommand } from './create-model-version.command';
import { ModelResponseDto } from '../../../dto/model-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IAiModelRepository } from '../../../domain/repositories/ai-model.repository';
import { ModelVersion } from '../../../domain/entities/model-version';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';
import { randomUUID } from 'crypto';

@CommandHandler(CreateModelVersionCommand)
export class CreateModelVersionHandler implements BaseCommandHandler<CreateModelVersionCommand, ModelResponseDto>, ICommandHandler<CreateModelVersionCommand> {
  constructor(@Inject('IAiModelRepository') private readonly repository: IAiModelRepository) {}

  async execute(command: CreateModelVersionCommand): Promise<ModelResponseDto> {
    const model = await this.repository.findById(command.modelId);
    if (!model) throw new NotFoundException(`AI Model '${command.modelId}' not found.`);

    const mv = new ModelVersion({
      id: randomUUID(),
      modelId: model.id,
      version: command.dto.version,
      checksum: command.dto.checksum,
      artifactId: command.dto.artifactId,
    });

    model.addVersion(mv);
    await this.repository.save(model);
    return ModelResponseDto.fromEntity(model);
  }
}
