import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetEdgeNodeQuery } from './get-edge-node.query';
import { EdgeNodeResponseDto } from '../../../dto/edge-node.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IEdgeNodeRepository } from '../../../domain/repositories/edge-node.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetEdgeNodeQuery)
export class GetEdgeNodeHandler implements BaseQueryHandler<GetEdgeNodeQuery, EdgeNodeResponseDto>, IQueryHandler<GetEdgeNodeQuery> {
  constructor(@Inject('IEdgeNodeRepository') private readonly repository: IEdgeNodeRepository) {}

  async execute(query: GetEdgeNodeQuery): Promise<EdgeNodeResponseDto> {
    const edge = await this.repository.findById(query.id);
    if (!edge) throw new NotFoundException(`Edge Node '${query.id}' not found.`);
    return EdgeNodeResponseDto.fromEntity(edge);
  }
}
