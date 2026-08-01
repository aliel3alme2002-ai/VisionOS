import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateModelCommand } from './update-model.command';
import { ModelResponseDto } from '../../../dto/model-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IAiModelRepository } from '../../../domain/repositories/ai-model.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(UpdateModelCommand)
export class UpdateModelHandler implements BaseCommandHandler<UpdateModelCommand, ModelResponseDto>, ICommandHandler<UpdateModelCommand> {
  constructor(@Inject('IAiModelRepository') private readonly repository: IAiModelRepository) {}

  async execute(command: UpdateModelCommand): Promise<ModelResponseDto> {
    const model = await this.repository.findById(command.id);
    if (!model) throw new NotFoundException(`AI Model '${command.id}' not found.`);
    model.update(command.dto.name, command.dto.description);
    await this.repository.save(model);
    return ModelResponseDto.fromEntity(model);
  }
}
