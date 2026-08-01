import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { StreamProfile } from '../domain/entities/stream-profile';

export class CreateStreamProfileDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  codec?: string;

  @IsString()
  @IsOptional()
  resolution?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  fps?: number;

  @IsInt()
  @Min(100)
  @IsOptional()
  bitrate?: number;

  @IsString()
  @IsOptional()
  transport?: string;
}

export class StreamProfileResponseDto {
  id!: string;
  name!: string;
  codec!: string;
  resolution!: string;
  fps!: number;
  bitrate!: number;
  transport!: string;

  public static fromEntity(sp: StreamProfile): StreamProfileResponseDto {
    const dto = new StreamProfileResponseDto();
    dto.id = sp.id;
    dto.name = sp.name;
    dto.codec = sp.codec;
    dto.resolution = sp.resolution;
    dto.fps = sp.fps;
    dto.bitrate = sp.bitrate;
    dto.transport = sp.transport;
    return dto;
  }
}
