import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListOrganizationsQuery } from './list-organizations.query';
import { OrganizationResponseDto } from '../../../dto/organization-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IOrganizationRepository } from '../../../domain/repositories/organization.repository';

@QueryHandler(ListOrganizationsQuery)
export class ListOrganizationsHandler
  implements BaseQueryHandler<ListOrganizationsQuery, OrganizationResponseDto[]>, IQueryHandler<ListOrganizationsQuery>
{
  constructor(
    @Inject('IOrganizationRepository')
    private readonly repository: IOrganizationRepository,
  ) {}

  async execute(query: ListOrganizationsQuery): Promise<OrganizationResponseDto[]> {
    const orgs = await this.repository.findAll(query.includeDeleted);
    return orgs.map((org) => OrganizationResponseDto.fromEntity(org));
  }
}
