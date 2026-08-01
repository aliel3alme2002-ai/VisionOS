import { Camera } from '../../../../modules/vision/domain/entities/camera';
import { CameraGroup } from '../../../../modules/vision/domain/entities/camera-group';
import { StreamProfile } from '../../../../modules/vision/domain/entities/stream-profile';
import { EdgeNode } from '../../../../modules/vision/domain/entities/edge-node';
import { CameraStatus } from '../../../../modules/vision/domain/value-objects/camera-status';
import { EdgeStatus } from '../../../../modules/vision/domain/value-objects/edge-status';

export interface RawCameraRecord {
  id: string;
  organizationId: string;
  name: string;
  location?: string | null;
  groupId?: string | null;
  manufacturer?: string | null;
  model?: string | null;
  serialNumber?: string | null;
  firmwareVersion?: string | null;
  ipAddress: string;
  macAddress?: string | null;
  rtspUrl: string;
  onvifEnabled?: boolean;
  streamProfileId?: string | null;
  credentialId?: string | null;
  edgeNodeId?: string | null;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface RawCameraGroupRecord {
  id: string;
  organizationId: string;
  name: string;
  description?: string | null;
}

export interface RawStreamProfileRecord {
  id: string;
  name: string;
  codec?: string;
  resolution?: string;
  fps?: number;
  bitrate?: number;
  transport?: string;
}

export interface RawEdgeNodeRecord {
  id: string;
  organizationId: string;
  name: string;
  hostname: string;
  ipAddress: string;
  status?: string;
  version?: string;
  heartbeatAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class VisionMapper {
  public static cameraToDomain(raw: RawCameraRecord): Camera {
    return new Camera({
      id: raw.id,
      organizationId: raw.organizationId,
      name: raw.name,
      location: raw.location ?? null,
      groupId: raw.groupId ?? null,
      manufacturer: raw.manufacturer ?? null,
      model: raw.model ?? null,
      serialNumber: raw.serialNumber ?? null,
      firmwareVersion: raw.firmwareVersion ?? null,
      ipAddress: raw.ipAddress,
      macAddress: raw.macAddress ?? null,
      rtspUrl: raw.rtspUrl,
      onvifEnabled: raw.onvifEnabled ?? true,
      streamProfileId: raw.streamProfileId ?? null,
      credentialId: raw.credentialId ?? null,
      edgeNodeId: raw.edgeNodeId ?? null,
      status: CameraStatus.create(raw.status ?? 'ONLINE'),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt ?? null,
    });
  }

  public static cameraToPrisma(domain: Camera): RawCameraRecord {
    return {
      id: domain.id,
      organizationId: domain.organizationId,
      name: domain.name,
      location: domain.location,
      groupId: domain.groupId,
      manufacturer: domain.manufacturer,
      model: domain.model,
      serialNumber: domain.serialNumber,
      firmwareVersion: domain.firmwareVersion,
      ipAddress: domain.ipAddress,
      macAddress: domain.macAddress,
      rtspUrl: domain.rtspUrl,
      onvifEnabled: domain.onvifEnabled,
      streamProfileId: domain.streamProfileId,
      credentialId: domain.credentialId,
      edgeNodeId: domain.edgeNodeId,
      status: domain.status.getValue(),
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  public static cameraGroupToDomain(raw: RawCameraGroupRecord): CameraGroup {
    return new CameraGroup({
      id: raw.id,
      organizationId: raw.organizationId,
      name: raw.name,
      description: raw.description ?? null,
    });
  }

  public static streamProfileToDomain(raw: RawStreamProfileRecord): StreamProfile {
    return new StreamProfile({
      id: raw.id,
      name: raw.name,
      codec: raw.codec ?? 'H.264',
      resolution: raw.resolution ?? '1080p',
      fps: raw.fps ?? 30,
      bitrate: raw.bitrate ?? 4000,
      transport: raw.transport ?? 'RTSP',
    });
  }

  public static edgeNodeToDomain(raw: RawEdgeNodeRecord): EdgeNode {
    return new EdgeNode({
      id: raw.id,
      organizationId: raw.organizationId,
      name: raw.name,
      hostname: raw.hostname,
      ipAddress: raw.ipAddress,
      status: EdgeStatus.create(raw.status ?? 'ONLINE'),
      version: raw.version ?? '1.0.0',
      heartbeatAt: raw.heartbeatAt ?? new Date(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt ?? null,
    });
  }

  public static edgeNodeToPrisma(domain: EdgeNode): RawEdgeNodeRecord {
    return {
      id: domain.id,
      organizationId: domain.organizationId,
      name: domain.name,
      hostname: domain.hostname,
      ipAddress: domain.ipAddress,
      status: domain.status.getValue(),
      version: domain.version,
      heartbeatAt: domain.heartbeatAt,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
