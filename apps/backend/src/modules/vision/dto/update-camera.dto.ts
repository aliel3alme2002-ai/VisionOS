import { IsOptional, IsString } from 'class-validator';

export class UpdateCameraDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  ipAddress?: string;

  @IsString()
  @IsOptional()
  rtspUrl?: string;

  @IsString()
  @IsOptional()
  groupId?: string;

  @IsString()
  @IsOptional()
  streamProfileId?: string;

  @IsString()
  @IsOptional()
  credentialId?: string;
}

export class MoveCameraDto {
  @IsString()
  @IsOptional()
  targetEdgeNodeId?: string;
}
