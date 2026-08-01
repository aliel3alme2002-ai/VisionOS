import { Controller, Post, Get, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';
import { OrganizationResponseDto } from '../dto/organization-response.dto';
import { OrganizationSettingsDto } from '../dto/organization-settings.dto';
import { OrganizationBrandingDto } from '../dto/organization-branding.dto';
import { OrganizationFeaturesDto } from '../dto/organization-features.dto';
import { OrganizationLimitsDto } from '../dto/organization-limits.dto';

import { CreateOrganizationCommand } from '../application/commands/create-organization/create-organization.command';
import { UpdateOrganizationCommand } from '../application/commands/update-organization/update-organization.command';
import { DeleteOrganizationCommand } from '../application/commands/delete-organization/delete-organization.command';
import { RestoreOrganizationCommand } from '../application/commands/restore-organization/restore-organization.command';
import { UpdateSettingsCommand } from '../application/commands/update-settings/update-settings.command';
import { UpdateBrandingCommand } from '../application/commands/update-branding/update-branding.command';
import { UpdateFeaturesCommand } from '../application/commands/update-features/update-features.command';
import { UpdateLimitsCommand } from '../application/commands/update-limits/update-limits.command';

import { GetOrganizationQuery } from '../application/queries/get-organization/get-organization.query';
import { ListOrganizationsQuery } from '../application/queries/list-organizations/list-organizations.query';
import { GetSettingsQuery } from '../application/queries/get-settings/get-settings.query';

@Controller('organizations')
export class OrganizationController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateOrganizationDto): Promise<ApiResponse<OrganizationResponseDto>> {
    const command = new CreateOrganizationCommand(dto.name, dto.ownerId, dto.slug, dto.description);
    const result = await this.commandBus.execute<CreateOrganizationCommand, OrganizationResponseDto>(command);
    return this.success(result);
  }

  @Get()
  async list(@Query('includeDeleted') includeDeleted?: string): Promise<ApiResponse<OrganizationResponseDto[]>> {
    const isIncludeDeleted = includeDeleted === 'true';
    const query = new ListOrganizationsQuery(isIncludeDeleted);
    const result = await this.queryBus.execute<ListOrganizationsQuery, OrganizationResponseDto[]>(query);
    return this.success(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApiResponse<OrganizationResponseDto>> {
    const query = new GetOrganizationQuery(id);
    const result = await this.queryBus.execute<GetOrganizationQuery, OrganizationResponseDto>(query);
    return this.success(result);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateOrganizationDto,
  ): Promise<ApiResponse<OrganizationResponseDto>> {
    const command = new UpdateOrganizationCommand(id, dto.name, dto.description);
    const result = await this.commandBus.execute<UpdateOrganizationCommand, OrganizationResponseDto>(command);
    return this.success(result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    const command = new DeleteOrganizationCommand(id);
    await this.commandBus.execute(command);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(@Param('id') id: string): Promise<ApiResponse<OrganizationResponseDto>> {
    const command = new RestoreOrganizationCommand(id);
    const result = await this.commandBus.execute<RestoreOrganizationCommand, OrganizationResponseDto>(command);
    return this.success(result);
  }

  @Put(':id/settings')
  async updateSettings(
    @Param('id') id: string,
    @Body() dto: OrganizationSettingsDto,
  ): Promise<ApiResponse<OrganizationResponseDto>> {
    const command = new UpdateSettingsCommand(id, dto);
    const result = await this.commandBus.execute<UpdateSettingsCommand, OrganizationResponseDto>(command);
    return this.success(result);
  }

  @Get(':id/settings')
  async getSettings(@Param('id') id: string): Promise<ApiResponse<any>> {
    const query = new GetSettingsQuery(id);
    const result = await this.queryBus.execute<GetSettingsQuery, any>(query);
    return this.success(result);
  }

  @Put(':id/features')
  async updateFeatures(
    @Param('id') id: string,
    @Body() dto: OrganizationFeaturesDto,
  ): Promise<ApiResponse<OrganizationResponseDto>> {
    const command = new UpdateFeaturesCommand(id, dto);
    const result = await this.commandBus.execute<UpdateFeaturesCommand, OrganizationResponseDto>(command);
    return this.success(result);
  }

  @Put(':id/branding')
  async updateBranding(
    @Param('id') id: string,
    @Body() dto: OrganizationBrandingDto,
  ): Promise<ApiResponse<OrganizationResponseDto>> {
    const command = new UpdateBrandingCommand(id, dto);
    const result = await this.commandBus.execute<UpdateBrandingCommand, OrganizationResponseDto>(command);
    return this.success(result);
  }

  @Put(':id/limits')
  async updateLimits(
    @Param('id') id: string,
    @Body() dto: OrganizationLimitsDto,
  ): Promise<ApiResponse<OrganizationResponseDto>> {
    const command = new UpdateLimitsCommand(id, dto);
    const result = await this.commandBus.execute<UpdateLimitsCommand, OrganizationResponseDto>(command);
    return this.success(result);
  }
}
