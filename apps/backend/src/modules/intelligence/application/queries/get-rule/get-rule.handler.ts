import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetRuleQuery } from './get-rule.query';
import { RuleResponseDto } from '../../../dto/rule-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IRuleRepository } from '../../../domain/repositories/rule.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetRuleQuery)
export class GetRuleHandler implements BaseQueryHandler<GetRuleQuery, RuleResponseDto>, IQueryHandler<GetRuleQuery> {
  constructor(@Inject('IRuleRepository') private readonly repository: IRuleRepository) {}

  async execute(query: GetRuleQuery): Promise<RuleResponseDto> {
    const rule = await this.repository.findById(query.id);
    if (!rule) throw new NotFoundException(`Rule '${query.id}' not found.`);
    return RuleResponseDto.fromEntity(rule);
  }
}
