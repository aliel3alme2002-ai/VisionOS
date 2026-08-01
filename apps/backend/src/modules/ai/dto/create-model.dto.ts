import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateModelDto {
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
  framework!: string;

  @IsString()
  @IsNotEmpty()
  task!: string;

  @IsString()
  @IsNotEmpty()
  inputShape!: string;

  @IsString()
  @IsNotEmpty()
  outputShape!: string;
}
