import { IsOptional, IsString } from 'class-validator';

export class OrganizationBrandingDto {
  @IsString()
  @IsOptional()
  logoUrl?: string;

  @IsString()
  @IsOptional()
  primaryColor?: string;

  @IsString()
  @IsOptional()
  secondaryColor?: string;

  @IsString()
  @IsOptional()
  faviconUrl?: string;
}
