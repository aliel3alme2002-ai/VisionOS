import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateZoneDto {
  @IsString()
  @IsNotEmpty()
  organizationId!: string;

  @IsString()
  @IsNotEmpty()
  cameraId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsArray()
  polygon!: { x: number; y: number }[];

  @IsString()
  @IsOptional()
  type?: string;
}
