import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCameraDto {
  @IsString()
  @IsNotEmpty()
  organizationId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  groupId?: string;

  @IsString()
  @IsOptional()
  manufacturer?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  serialNumber?: string;

  @IsString()
  @IsOptional()
  firmwareVersion?: string;

  @IsString()
  @IsNotEmpty()
  ipAddress!: string;

  @IsString()
  @IsOptional()
  macAddress?: string;

  @IsString()
  @IsNotEmpty()
  rtspUrl!: string;

  @IsBoolean()
  @IsOptional()
  onvifEnabled?: boolean;

  @IsString()
  @IsOptional()
  streamProfileId?: string;

  @IsString()
  @IsOptional()
  credentialId?: string;

  @IsString()
  @IsOptional()
  edgeNodeId?: string;
}
