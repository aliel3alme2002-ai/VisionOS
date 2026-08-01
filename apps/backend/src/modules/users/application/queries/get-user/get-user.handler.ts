import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserQuery } from './get-user.query';
import { UserResponseDto } from '../../../dto/user-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements BaseQueryHandler<GetUserQuery, UserResponseDto>, IQueryHandler<GetUserQuery> {
  constructor(@Inject('IUserRepository') private readonly repository: IUserRepository) {}

  async execute(query: GetUserQuery): Promise<UserResponseDto> {
    const user = await this.repository.findById(query.id);
    if (!user) throw new NotFoundException(`User with ID '${query.id}' not found.`);
    return UserResponseDto.fromEntity(user);
  }
}
