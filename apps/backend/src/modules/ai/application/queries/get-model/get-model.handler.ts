import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetModelQuery } from './get-model.query';
import { ModelResponseDto } from '../../../dto/model-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IAiModelRepository } from '../../../domain/repositories/ai-model.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetModelQuery)
export class GetModelHandler implements BaseQueryHandler<GetModelQuery, ModelResponseDto>, IQueryHandler<GetModelQuery> {
  constructor(@Inject('IAiModelRepository') private readonly repository: IAiModelRepository) {}

  async execute(query: GetModelQuery): Promise<ModelResponseDto> {
    const model = await this.repository.findById(query.id);
    if (!model) throw new NotFoundException(`AI Model '${query.id}' not found.`);
    return ModelResponseDto.fromEntity(model);
  }
}
