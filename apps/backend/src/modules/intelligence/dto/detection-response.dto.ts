import { Detection } from '../domain/entities/detection';

export class DetectionResponseDto {
  id!: string;
  cameraId!: string;
  pipelineId!: string;
  runtimeId!: string;
  frameId!: string;
  timestamp!: string;
  objectsCount!: number;

  public static fromEntity(det: Detection): DetectionResponseDto {
    const dto = new DetectionResponseDto();
    dto.id = det.id;
    dto.cameraId = det.cameraId;
    dto.pipelineId = det.pipelineId;
    dto.runtimeId = det.runtimeId;
    dto.frameId = det.frameId;
    dto.timestamp = det.timestamp.toISOString();
    dto.objectsCount = det.objects.length;
    return dto;
  }
}
