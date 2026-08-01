import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { EvaluateAccessDto, EvaluateAccessResponseDto } from '../application/dto/evaluate-access.dto';
import { EvaluateAccessQuery } from '../application/queries/evaluate-access/evaluate-access.query';

@Controller('access')
export class AuthorizationController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  @Post('evaluate')
  @HttpCode(HttpStatus.OK)
  async evaluateAccess(@Body() dto: EvaluateAccessDto): Promise<ApiResponse<EvaluateAccessResponseDto>> {
    const query = new EvaluateAccessQuery(
      dto.userId,
      dto.organizationId,
      dto.requiredPermission,
      dto.resourceOwnerId,
    );
    const result = await this.queryBus.execute<EvaluateAccessQuery, EvaluateAccessResponseDto>(query);
    return this.success(result);
  }
}
