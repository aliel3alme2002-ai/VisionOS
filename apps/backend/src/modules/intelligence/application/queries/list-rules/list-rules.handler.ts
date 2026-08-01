import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListRulesQuery } from './list-rules.query';
import { RuleResponseDto } from '../../../dto/rule-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IRuleRepository } from '../../../domain/repositories/rule.repository';

@QueryHandler(ListRulesQuery)
export class ListRulesHandler implements BaseQueryHandler<ListRulesQuery, RuleResponseDto[]>, IQueryHandler<ListRulesQuery> {
  constructor(@Inject('IRuleRepository') private readonly repository: IRuleRepository) {}

  async execute(query: ListRulesQuery): Promise<RuleResponseDto[]> {
    const list = await this.repository.findByOrgId(query.organizationId);
    return list.map((r) => RuleResponseDto.fromEntity(r));
  }
}
