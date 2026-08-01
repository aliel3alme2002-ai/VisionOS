import { Controller, Post, Get, Put, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { CreateRuleDto } from '../dto/create-rule.dto';
import { RuleResponseDto } from '../dto/rule-response.dto';

import { CreateRuleCommand } from '../application/commands/create-rule/create-rule.command';
import { UpdateRuleCommand } from '../application/commands/update-rule/update-rule.command';
import { EvaluateRulesCommand } from '../application/commands/evaluate-rules/evaluate-rules.command';

import { GetRuleQuery } from '../application/queries/get-rule/get-rule.query';
import { ListRulesQuery } from '../application/queries/list-rules/list-rules.query';

@Controller('intelligence/rules')
export class RulesController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateRuleDto): Promise<ApiResponse<RuleResponseDto>> {
    const command = new CreateRuleCommand(dto);
    const result = await this.commandBus.execute<CreateRuleCommand, RuleResponseDto>(command);
    return this.success(result);
  }

  @Get()
  async list(@Query('organizationId') organizationId: string): Promise<ApiResponse<RuleResponseDto[]>> {
    const query = new ListRulesQuery(organizationId);
    const result = await this.queryBus.execute<ListRulesQuery, RuleResponseDto[]>(query);
    return this.success(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApiResponse<RuleResponseDto>> {
    const query = new GetRuleQuery(id);
    const result = await this.queryBus.execute<GetRuleQuery, RuleResponseDto>(query);
    return this.success(result);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { enabled?: boolean },
  ): Promise<ApiResponse<RuleResponseDto>> {
    const command = new UpdateRuleCommand(id, body.enabled);
    const result = await this.commandBus.execute<UpdateRuleCommand, RuleResponseDto>(command);
    return this.success(result);
  }

  @Post('evaluate')
  @HttpCode(HttpStatus.OK)
  async evaluate(
    @Body() body: { organizationId: string; detectionId: string },
  ): Promise<ApiResponse<RuleResponseDto[]>> {
    const command = new EvaluateRulesCommand(body.organizationId, body.detectionId);
    const result = await this.commandBus.execute<EvaluateRulesCommand, RuleResponseDto[]>(command);
    return this.success(result);
  }
}
