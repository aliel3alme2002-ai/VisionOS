import { IsObject, IsOptional, IsString } from 'class-validator';

export class UserPreferencesDto {
  @IsString()
  @IsOptional()
  theme?: string;

  @IsString()
  @IsOptional()
  dashboard?: string;

  @IsObject()
  @IsOptional()
  notifications?: Record<string, boolean>;

  @IsString()
  @IsOptional()
  defaultCameraView?: string;
}
