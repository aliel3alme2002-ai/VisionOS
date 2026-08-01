import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetEdgeHealthQuery } from './get-edge-health.query';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IEdgeNodeRepository } from '../../../domain/repositories/edge-node.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetEdgeHealthQuery)
export class GetEdgeHealthHandler implements BaseQueryHandler<GetEdgeHealthQuery, any>, IQueryHandler<GetEdgeHealthQuery> {
  constructor(@Inject('IEdgeNodeRepository') private readonly repository: IEdgeNodeRepository) {}

  async execute(query: GetEdgeHealthQuery): Promise<any> {
    const edge = await this.repository.findById(query.edgeNodeId);
    if (!edge) throw new NotFoundException(`Edge Node '${query.edgeNodeId}' not found.`);
    return {
      status: edge.status.getValue(),
      heartbeatAt: edge.heartbeatAt.toISOString(),
      deploymentSlotsCount: edge.deploymentSlots.length,
    };
  }
}
