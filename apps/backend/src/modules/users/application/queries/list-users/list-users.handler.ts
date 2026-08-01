import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListUsersQuery } from './list-users.query';
import { UserResponseDto } from '../../../dto/user-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IUserRepository } from '../../../domain/repositories/user.repository';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements BaseQueryHandler<ListUsersQuery, UserResponseDto[]>, IQueryHandler<ListUsersQuery> {
  constructor(@Inject('IUserRepository') private readonly repository: IUserRepository) {}

  async execute(query: ListUsersQuery): Promise<UserResponseDto[]> {
    if (query.organizationId) {
      const users = await this.repository.findByOrgId(query.organizationId, query.includeDeleted);
      return users.map((u) => UserResponseDto.fromEntity(u));
    }
    return [];
  }
}
