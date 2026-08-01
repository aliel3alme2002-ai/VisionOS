import { Runtime } from '../domain/entities/runtime';

export class RuntimeResponseDto {
  id!: string;
  edgeNodeId!: string;
  type!: string;
  version!: string;
  status!: string;
  latencyMs!: number;
  gpuCount!: number;

  public static fromEntity(r: Runtime): RuntimeResponseDto {
    const dto = new RuntimeResponseDto();
    dto.id = r.id;
    dto.edgeNodeId = r.edgeNodeId;
    dto.type = r.type;
    dto.version = r.version;
    dto.status = r.status.getValue();
    dto.latencyMs = r.health.latencyMs;
    dto.gpuCount = r.gpuDevices.length;
    return dto;
  }
}
