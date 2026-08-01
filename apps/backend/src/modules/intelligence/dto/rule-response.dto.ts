import { Rule } from '../domain/entities/rule';

export class RuleResponseDto {
  id!: string;
  organizationId!: string;
  name!: string;
  enabled!: boolean;
  priority!: number;
  conditionsCount!: number;
  actionsCount!: number;

  public static fromEntity(rule: Rule): RuleResponseDto {
    const dto = new RuleResponseDto();
    dto.id = rule.id;
    dto.organizationId = rule.organizationId;
    dto.name = rule.name;
    dto.enabled = rule.enabled;
    dto.priority = rule.priority;
    dto.conditionsCount = rule.conditions.length;
    dto.actionsCount = rule.actions.length;
    return dto;
  }
}
