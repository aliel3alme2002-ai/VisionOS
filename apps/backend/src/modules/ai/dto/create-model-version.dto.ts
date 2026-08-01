import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModelVersionDto {
  @IsString()
  @IsNotEmpty()
  version!: string;

  @IsString()
  @IsNotEmpty()
  checksum!: string;

  @IsString()
  @IsNotEmpty()
  artifactId!: string;
}
