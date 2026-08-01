import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRuleDto {
  @IsString()
  @IsNotEmpty()
  organizationId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsArray()
  @IsOptional()
  conditions?: any[];

  @IsArray()
  @IsOptional()
  actions?: any[];
}
