import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { EvaluateRulesCommand } from './evaluate-rules.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IDetectionRepository } from '../../../domain/repositories/detection.repository';
import { RuleEvaluationService } from '../../../domain/services/rule-evaluation.service';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';
import { RuleResponseDto } from '../../../dto/rule-response.dto';

@CommandHandler(EvaluateRulesCommand)
export class EvaluateRulesHandler implements BaseCommandHandler<EvaluateRulesCommand, RuleResponseDto[]>, ICommandHandler<EvaluateRulesCommand> {
  constructor(
    @Inject('IDetectionRepository') private readonly detectionRepo: IDetectionRepository,
    private readonly ruleService: RuleEvaluationService,
  ) {}

  async execute(command: EvaluateRulesCommand): Promise<RuleResponseDto[]> {
    const det = await this.detectionRepo.findById(command.detectionId);
    if (!det) throw new NotFoundException(`Detection '${command.detectionId}' not found.`);
    const matchedRules = await this.ruleService.evaluateRules(command.organizationId, det);
    return matchedRules.map((r) => RuleResponseDto.fromEntity(r));
  }
}
