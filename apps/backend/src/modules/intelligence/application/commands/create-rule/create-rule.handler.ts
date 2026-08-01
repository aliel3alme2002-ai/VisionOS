import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateRuleCommand } from './create-rule.command';
import { RuleResponseDto } from '../../../dto/rule-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IRuleRepository } from '../../../domain/repositories/rule.repository';
import { Rule, RuleProps } from '../../../domain/entities/rule';
import { RuleCondition } from '../../../domain/entities/rule-condition';
import { RuleAction } from '../../../domain/entities/rule-action';
import { RuleActionType } from '../../../domain/value-objects/rule-action-type';
import { randomUUID } from 'crypto';

@CommandHandler(CreateRuleCommand)
export class CreateRuleHandler implements BaseCommandHandler<CreateRuleCommand, RuleResponseDto>, ICommandHandler<CreateRuleCommand> {
  constructor(@Inject('IRuleRepository') private readonly repository: IRuleRepository) {}

  async execute(command: CreateRuleCommand): Promise<RuleResponseDto> {
    const dto = command.dto;
    const conditions = dto.conditions ? dto.conditions.map((c) => new RuleCondition({ type: c.type, params: c.params })) : [];
    const actions = dto.actions ? dto.actions.map((a) => new RuleAction({ type: RuleActionType.create(a.type), params: a.params })) : [];

    const props: RuleProps = {
      id: randomUUID(),
      organizationId: dto.organizationId,
      name: dto.name,
      conditions,
      actions,
    };
    const rule = new Rule(props);
    await this.repository.save(rule);
    return RuleResponseDto.fromEntity(rule);
  }
}
