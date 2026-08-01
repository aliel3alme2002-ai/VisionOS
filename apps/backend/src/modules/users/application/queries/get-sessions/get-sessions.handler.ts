import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSessionsQuery } from './get-sessions.query';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetSessionsQuery)
export class GetSessionsHandler implements BaseQueryHandler<GetSessionsQuery, any[]>, IQueryHandler<GetSessionsQuery> {
  constructor(@Inject('IUserRepository') private readonly repository: IUserRepository) {}

  async execute(query: GetSessionsQuery): Promise<any[]> {
    const user = await this.repository.findById(query.id);
    if (!user) throw new NotFoundException(`User with ID '${query.id}' not found.`);
    return user.sessions.map((s) => ({
      sessionId: s.sessionId,
      deviceName: s.deviceName,
      deviceType: s.deviceType,
      browser: s.browser,
      operatingSystem: s.operatingSystem,
      ipAddress: s.ipAddress,
      lastActivity: s.lastActivity.toISOString(),
      expiresAt: s.expiresAt.toISOString(),
    }));
  }
}
