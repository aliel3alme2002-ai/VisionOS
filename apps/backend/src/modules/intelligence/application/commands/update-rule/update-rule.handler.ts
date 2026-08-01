import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateRuleCommand } from './update-rule.command';
import { RuleResponseDto } from '../../../dto/rule-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IRuleRepository } from '../../../domain/repositories/rule.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(UpdateRuleCommand)
export class UpdateRuleHandler implements BaseCommandHandler<UpdateRuleCommand, RuleResponseDto>, ICommandHandler<UpdateRuleCommand> {
  constructor(@Inject('IRuleRepository') private readonly repository: IRuleRepository) {}

  async execute(command: UpdateRuleCommand): Promise<RuleResponseDto> {
    const rule = await this.repository.findById(command.id);
    if (!rule) throw new NotFoundException(`Rule '${command.id}' not found.`);
    if (command.enabled !== undefined) {
      if (command.enabled) rule.enable();
      else rule.disable();
    }
    await this.repository.save(rule);
    return RuleResponseDto.fromEntity(rule);
  }
}
