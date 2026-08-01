import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { MeQuery } from './me.query';
import { UserInfoDto } from '../../../dto/login-response.dto';
import { NotImplementedException } from '@nestjs/common';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';

@QueryHandler(MeQuery)
export class MeHandler implements BaseQueryHandler<MeQuery, UserInfoDto>, IQueryHandler<MeQuery> {
  async execute(_query: MeQuery): Promise<UserInfoDto> {
    throw new NotImplementedException('Me query logic not yet implemented');
  }
}
