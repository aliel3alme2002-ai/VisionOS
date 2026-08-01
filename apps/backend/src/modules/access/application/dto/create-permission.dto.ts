import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PermissionScopeEnum } from '../../domain/entities/permission-scope';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  resource!: string;

  @IsString()
  @IsNotEmpty()
  action!: string;

  @IsEnum(PermissionScopeEnum)
  @IsOptional()
  scope?: PermissionScopeEnum;

  @IsString()
  @IsOptional()
  description?: string;
}
