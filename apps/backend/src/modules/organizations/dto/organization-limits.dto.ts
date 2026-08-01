import { IsInt, IsOptional, Min } from 'class-validator';

export class OrganizationLimitsDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  maxUsers?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  maxCameras?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  maxEdgeNodes?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  maxAiModels?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  maxPipelines?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  maxStorageGb?: number;
}
