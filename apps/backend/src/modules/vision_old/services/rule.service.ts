import { Injectable, Inject } from '@nestjs/common';
import { Rule } from '../domain/rule';
import { RuleRepository, RULE_REPOSITORY } from '../repositories/rule.repository';

@Injectable()
export class RuleService {
  constructor(
    @Inject(RULE_REPOSITORY) private readonly ruleRepo: RuleRepository
  ) {}

  async createRule(rule: Rule): Promise<void> {
    await this.ruleRepo.save(rule);
  }
}
