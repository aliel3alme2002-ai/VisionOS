import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetRoleQuery } from './get-role.query';
import { RoleResponseDto } from '../../dto/role-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IRoleRepository } from '../../../domain/repositories/role.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetRoleQuery)
export class GetRoleHandler implements BaseQueryHandler<GetRoleQuery, RoleResponseDto>, IQueryHandler<GetRoleQuery> {
  constructor(@Inject('IRoleRepository') private readonly repository: IRoleRepository) {}

  async execute(query: GetRoleQuery): Promise<RoleResponseDto> {
    const role = await this.repository.findById(query.id);
    if (!role) throw new NotFoundException(`Role '${query.id}' not found.`);
    return RoleResponseDto.fromEntity(role);
  }
}
