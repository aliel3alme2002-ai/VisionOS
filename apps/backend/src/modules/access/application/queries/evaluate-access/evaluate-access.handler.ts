import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { EvaluateAccessQuery } from './evaluate-access.query';
import { EvaluateAccessResponseDto } from '../../dto/evaluate-access.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { AccessEvaluationService, EvaluationRequest } from '../../../domain/services/access-evaluation.service';

@QueryHandler(EvaluateAccessQuery)
export class EvaluateAccessHandler implements BaseQueryHandler<EvaluateAccessQuery, EvaluateAccessResponseDto>, IQueryHandler<EvaluateAccessQuery> {
  constructor(private readonly evaluationService: AccessEvaluationService) {}

  async execute(query: EvaluateAccessQuery): Promise<EvaluateAccessResponseDto> {
    const req: EvaluationRequest = {
      userId: query.userId,
      organizationId: query.organizationId,
      requiredPermission: query.requiredPermission,
    };
    if (query.resourceOwnerId !== undefined) {
      req.resourceOwnerId = query.resourceOwnerId;
    }
    const res = await this.evaluationService.evaluate(req);
    const dto = new EvaluateAccessResponseDto();
    dto.allowed = res.allowed;
    dto.resolvedPermissions = res.resolvedPermissions;
    if (res.reason !== undefined) {
      dto.reason = res.reason;
    }
    return dto;
  }
}
