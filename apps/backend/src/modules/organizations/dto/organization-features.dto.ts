import { IsBoolean, IsOptional } from 'class-validator';

export class OrganizationFeaturesDto {
  @IsBoolean()
  @IsOptional()
  visionEnabled?: boolean;

  @IsBoolean()
  @IsOptional()
  edgeEnabled?: boolean;

  @IsBoolean()
  @IsOptional()
  recordingEnabled?: boolean;

  @IsBoolean()
  @IsOptional()
  workflowEnabled?: boolean;

  @IsBoolean()
  @IsOptional()
  notificationEnabled?: boolean;

  @IsBoolean()
  @IsOptional()
  analyticsEnabled?: boolean;
}
