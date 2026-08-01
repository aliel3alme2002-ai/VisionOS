import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDeploymentQuery } from './get-deployment.query';
import { DeploymentResponseDto } from '../../../dto/deployment-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IDeploymentRepository } from '../../../domain/repositories/deployment.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetDeploymentQuery)
export class GetDeploymentHandler implements BaseQueryHandler<GetDeploymentQuery, DeploymentResponseDto>, IQueryHandler<GetDeploymentQuery> {
  constructor(@Inject('IDeploymentRepository') private readonly repository: IDeploymentRepository) {}

  async execute(query: GetDeploymentQuery): Promise<DeploymentResponseDto> {
    const dep = await this.repository.findById(query.id);
    if (!dep) throw new NotFoundException(`Deployment '${query.id}' not found.`);
    return DeploymentResponseDto.fromEntity(dep);
  }
}
