import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProfileQuery } from './get-profile.query';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetProfileQuery)
export class GetProfileHandler implements BaseQueryHandler<GetProfileQuery, any>, IQueryHandler<GetProfileQuery> {
  constructor(@Inject('IUserRepository') private readonly repository: IUserRepository) {}

  async execute(query: GetProfileQuery): Promise<any> {
    const user = await this.repository.findById(query.id);
    if (!user) throw new NotFoundException(`User with ID '${query.id}' not found.`);
    return {
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      phone: user.profile.phone,
      jobTitle: user.profile.jobTitle,
      department: user.profile.department,
      language: user.profile.language,
      timezone: user.profile.timezone,
    };
  }
}
