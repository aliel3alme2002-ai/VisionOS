import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListEdgeNodesQuery } from './list-edge-nodes.query';
import { EdgeNodeResponseDto } from '../../../dto/edge-node.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IEdgeNodeRepository } from '../../../domain/repositories/edge-node.repository';

@QueryHandler(ListEdgeNodesQuery)
export class ListEdgeNodesHandler implements BaseQueryHandler<ListEdgeNodesQuery, EdgeNodeResponseDto[]>, IQueryHandler<ListEdgeNodesQuery> {
  constructor(@Inject('IEdgeNodeRepository') private readonly repository: IEdgeNodeRepository) {}

  async execute(query: ListEdgeNodesQuery): Promise<EdgeNodeResponseDto[]> {
    const edges = await this.repository.findByOrgId(query.organizationId, query.includeDeleted);
    return edges.map((e) => EdgeNodeResponseDto.fromEntity(e));
  }
}
