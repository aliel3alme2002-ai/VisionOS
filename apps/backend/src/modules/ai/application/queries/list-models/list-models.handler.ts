import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListModelsQuery } from './list-models.query';
import { ModelResponseDto } from '../../../dto/model-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IAiModelRepository } from '../../../domain/repositories/ai-model.repository';

@QueryHandler(ListModelsQuery)
export class ListModelsHandler implements BaseQueryHandler<ListModelsQuery, ModelResponseDto[]>, IQueryHandler<ListModelsQuery> {
  constructor(@Inject('IAiModelRepository') private readonly repository: IAiModelRepository) {}

  async execute(query: ListModelsQuery): Promise<ModelResponseDto[]> {
    const models = await this.repository.findByOrgId(query.organizationId);
    return models.map((m) => ModelResponseDto.fromEntity(m));
  }
}
