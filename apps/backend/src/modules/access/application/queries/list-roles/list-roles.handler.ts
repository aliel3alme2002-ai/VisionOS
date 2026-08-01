import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListRolesQuery } from './list-roles.query';
import { RoleResponseDto } from '../../dto/role-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IRoleRepository } from '../../../domain/repositories/role.repository';

@QueryHandler(ListRolesQuery)
export class ListRolesHandler implements BaseQueryHandler<ListRolesQuery, RoleResponseDto[]>, IQueryHandler<ListRolesQuery> {
  constructor(@Inject('IRoleRepository') private readonly repository: IRoleRepository) {}

  async execute(query: ListRolesQuery): Promise<RoleResponseDto[]> {
    const roles = await this.repository.findByOrgId(query.organizationId, query.includeDeleted);
    return roles.map((r) => RoleResponseDto.fromEntity(r));
  }
}
