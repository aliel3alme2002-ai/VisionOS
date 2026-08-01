import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PipelineStageProps } from '../domain/entities/pipeline-stage';

export class CreatePipelineDto {
  @IsString()
  @IsNotEmpty()
  organizationId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  runtimeId!: string;

  @IsArray()
  @IsOptional()
  stages?: PipelineStageProps[];
}
