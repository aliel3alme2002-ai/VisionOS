import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetOrganizationQuery } from './get-organization.query';
import { OrganizationResponseDto } from '../../../dto/organization-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IOrganizationRepository } from '../../../domain/repositories/organization.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetOrganizationQuery)
export class GetOrganizationHandler
  implements BaseQueryHandler<GetOrganizationQuery, OrganizationResponseDto>, IQueryHandler<GetOrganizationQuery>
{
  constructor(
    @Inject('IOrganizationRepository')
    private readonly repository: IOrganizationRepository,
  ) {}

  async execute(query: GetOrganizationQuery): Promise<OrganizationResponseDto> {
    const org = await this.repository.findById(query.id);
    if (!org) {
      throw new NotFoundException(`Organization with ID '${query.id}' not found.`);
    }
    return OrganizationResponseDto.fromEntity(org);
  }
}
