import { IsNotEmpty, IsString } from 'class-validator';

export class EdgeHeartbeatDto {
  @IsString()
  @IsNotEmpty()
  edgeNodeId!: string;
}
