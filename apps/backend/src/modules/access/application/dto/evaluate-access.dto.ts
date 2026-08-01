import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EvaluateAccessDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  organizationId!: string;

  @IsString()
  @IsNotEmpty()
  requiredPermission!: string; // Format: "camera.read:organization"

  @IsString()
  @IsOptional()
  resourceOwnerId?: string;
}

export class EvaluateAccessResponseDto {
  allowed!: boolean;
  reason?: string;
  resolvedPermissions!: string[];
}
