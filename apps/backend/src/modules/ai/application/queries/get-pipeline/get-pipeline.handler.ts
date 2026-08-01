import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPipelineQuery } from './get-pipeline.query';
import { PipelineResponseDto } from '../../../dto/pipeline-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IPipelineRepository } from '../../../domain/repositories/pipeline.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetPipelineQuery)
export class GetPipelineHandler implements BaseQueryHandler<GetPipelineQuery, PipelineResponseDto>, IQueryHandler<GetPipelineQuery> {
  constructor(@Inject('IPipelineRepository') private readonly repository: IPipelineRepository) {}

  async execute(query: GetPipelineQuery): Promise<PipelineResponseDto> {
    const pipe = await this.repository.findById(query.id);
    if (!pipe) throw new NotFoundException(`Pipeline '${query.id}' not found.`);
    return PipelineResponseDto.fromEntity(pipe);
  }
}
