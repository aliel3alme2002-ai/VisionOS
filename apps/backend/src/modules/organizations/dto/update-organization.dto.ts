import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateOrganizationDto {
  @IsString()
  @IsOptional()
  @Length(2, 100)
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
