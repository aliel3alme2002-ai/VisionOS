import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLineDto {
  @IsString()
  @IsNotEmpty()
  cameraId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  start!: { x: number; y: number };
  end!: { x: number; y: number };

  @IsString()
  @IsOptional()
  direction?: string;
}
