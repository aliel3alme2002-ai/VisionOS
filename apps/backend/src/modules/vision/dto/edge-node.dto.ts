import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EdgeNode } from '../domain/entities/edge-node';

export class RegisterEdgeNodeDto {
  @IsString()
  @IsNotEmpty()
  organizationId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  hostname!: string;

  @IsString()
  @IsNotEmpty()
  ipAddress!: string;

  @IsString()
  @IsOptional()
  version?: string;
}

export class EdgeNodeResponseDto {
  id!: string;
  organizationId!: string;
  name!: string;
  hostname!: string;
  ipAddress!: string;
  status!: string;
  version!: string;
  heartbeatAt!: string;

  public static fromEntity(edge: EdgeNode): EdgeNodeResponseDto {
    const dto = new EdgeNodeResponseDto();
    dto.id = edge.id;
    dto.organizationId = edge.organizationId;
    dto.name = edge.name;
    dto.hostname = edge.hostname;
    dto.ipAddress = edge.ipAddress;
    dto.status = edge.status.getValue();
    dto.version = edge.version;
    dto.heartbeatAt = edge.heartbeatAt.toISOString();
    return dto;
  }
}
