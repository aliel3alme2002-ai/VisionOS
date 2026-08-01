import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeploymentDto {
  @IsString()
  @IsNotEmpty()
  modelVersionId!: string;

  @IsString()
  @IsNotEmpty()
  runtimeId!: string;

  @IsString()
  @IsNotEmpty()
  deploymentSlotId!: string;

  @IsString()
  @IsOptional()
  strategy?: string; // Rolling | BlueGreen | Canary | ABTesting
}
