import { Camera } from '../domain/entities/camera';

export class CameraResponseDto {
  id!: string;
  organizationId!: string;
  name!: string;
  location!: string | null;
  groupId!: string | null;
  manufacturer!: string | null;
  model!: string | null;
  serialNumber!: string | null;
  firmwareVersion!: string | null;
  ipAddress!: string;
  macAddress!: string | null;
  rtspUrl!: string;
  onvifEnabled!: boolean;
  streamProfileId!: string | null;
  credentialId!: string | null;
  edgeNodeId!: string | null;
  status!: string;
  health!: {
    latency: number;
    packetLoss: number;
    bitrate: number;
    uptime: number;
    streamStatus: string;
    lastHeartbeat: string;
  };
  createdAt!: string;
  updatedAt!: string;
  deletedAt!: string | null;

  public static fromEntity(cam: Camera): CameraResponseDto {
    const dto = new CameraResponseDto();
    dto.id = cam.id;
    dto.organizationId = cam.organizationId;
    dto.name = cam.name;
    dto.location = cam.location;
    dto.groupId = cam.groupId;
    dto.manufacturer = cam.manufacturer;
    dto.model = cam.model;
    dto.serialNumber = cam.serialNumber;
    dto.firmwareVersion = cam.firmwareVersion;
    dto.ipAddress = cam.ipAddress;
    dto.macAddress = cam.macAddress;
    dto.rtspUrl = cam.rtspUrl;
    dto.onvifEnabled = cam.onvifEnabled;
    dto.streamProfileId = cam.streamProfileId;
    dto.credentialId = cam.credentialId;
    dto.edgeNodeId = cam.edgeNodeId;
    dto.status = cam.status.getValue();
    dto.health = {
      latency: cam.health.report.latency,
      packetLoss: cam.health.report.packetLoss,
      bitrate: cam.health.report.bitrate,
      uptime: cam.health.report.uptime,
      streamStatus: cam.health.report.streamStatus,
      lastHeartbeat: cam.health.report.lastHeartbeat.toISOString(),
    };
    dto.createdAt = cam.createdAt.toISOString();
    dto.updatedAt = cam.updatedAt.toISOString();
    dto.deletedAt = cam.deletedAt ? cam.deletedAt.toISOString() : null;
    return dto;
  }
}
