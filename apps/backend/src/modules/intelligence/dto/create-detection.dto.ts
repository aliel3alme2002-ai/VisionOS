import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ObjectDetectionInput {
  @IsString()
  @IsNotEmpty()
  className!: string;

  @IsNumber()
  confidence!: number;

  @IsNumber()
  x!: number;

  @IsNumber()
  y!: number;

  @IsNumber()
  width!: number;

  @IsNumber()
  height!: number;
}

export class CreateDetectionDto {
  @IsString()
  @IsNotEmpty()
  cameraId!: string;

  @IsString()
  @IsNotEmpty()
  pipelineId!: string;

  @IsString()
  @IsNotEmpty()
  runtimeId!: string;

  @IsString()
  @IsNotEmpty()
  frameId!: string;

  @IsArray()
  @IsOptional()
  objects?: ObjectDetectionInput[];
}
