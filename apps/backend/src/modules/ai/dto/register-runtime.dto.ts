import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterRuntimeDto {
  @IsString()
  @IsNotEmpty()
  edgeNodeId!: string;

  @IsString()
  @IsNotEmpty()
  type!: string; // TensorRT | ONNXRuntime | OpenVINO | PyTorch | TensorFlow | Frigate | Custom

  @IsString()
  @IsNotEmpty()
  version!: string;
}
