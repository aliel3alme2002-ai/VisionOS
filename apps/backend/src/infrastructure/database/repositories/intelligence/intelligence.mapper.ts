import { Detection } from '../../../../modules/intelligence/domain/entities/detection';
import { TrackedObject } from '../../../../modules/intelligence/domain/entities/tracked-object';
import { Rule } from '../../../../modules/intelligence/domain/entities/rule';
import { Zone } from '../../../../modules/intelligence/domain/entities/zone';
import { Event } from '../../../../modules/intelligence/domain/entities/event';
import { BoundingBox } from '../../../../modules/intelligence/domain/value-objects/bounding-box';
import { ZoneType } from '../../../../modules/intelligence/domain/value-objects/zone-type';

export interface RawDetectionRecord {
  id: string;
  cameraId: string;
  pipelineId: string;
  runtimeId: string;
  frameId: string;
  timestamp: Date;
}

export interface RawTrackedObjectRecord {
  id: string;
  trackingId: string;
  className: string;
  confidence: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  velocity?: number;
  direction?: string | null;
  zone?: string | null;
  firstSeen: Date;
  lastSeen: Date;
}

export interface RawIntelligenceRuleRecord {
  id: string;
  organizationId: string;
  name: string;
  enabled?: boolean;
  priority?: number;
}

export interface RawVisionZoneRecord {
  id: string;
  organizationId: string;
  cameraId: string;
  name: string;
  polygon?: { x: number; y: number }[];
  type?: string;
}

export interface RawIntelligenceEventRecord {
  id: string;
  type: string;
  cameraId: string;
  trackingId?: string | null;
  timestamp: Date;
  payload?: Record<string, unknown>;
}

export class IntelligenceMapper {
  public static detectionToDomain(raw: RawDetectionRecord): Detection {
    return new Detection({
      id: raw.id,
      cameraId: raw.cameraId,
      pipelineId: raw.pipelineId,
      runtimeId: raw.runtimeId,
      frameId: raw.frameId,
      timestamp: raw.timestamp,
    });
  }

  public static trackedObjectToDomain(raw: RawTrackedObjectRecord): TrackedObject {
    return new TrackedObject({
      id: raw.id,
      trackingId: raw.trackingId,
      className: raw.className,
      confidence: raw.confidence,
      bbox: new BoundingBox({ x: raw.x ?? 0, y: raw.y ?? 0, width: raw.width ?? 0, height: raw.height ?? 0 }),
      velocity: raw.velocity ?? 0,
      direction: raw.direction ?? null,
      zone: raw.zone ?? null,
      firstSeen: raw.firstSeen,
      lastSeen: raw.lastSeen,
    });
  }

  public static ruleToDomain(raw: RawIntelligenceRuleRecord): Rule {
    return new Rule({
      id: raw.id,
      organizationId: raw.organizationId,
      name: raw.name,
      enabled: raw.enabled ?? true,
      priority: raw.priority ?? 1,
    });
  }

  public static zoneToDomain(raw: RawVisionZoneRecord): Zone {
    return new Zone({
      id: raw.id,
      organizationId: raw.organizationId,
      cameraId: raw.cameraId,
      name: raw.name,
      polygon: raw.polygon ?? [],
      type: ZoneType.create(raw.type ?? 'Detection'),
    });
  }

  public static eventToDomain(raw: RawIntelligenceEventRecord): Event {
    return new Event({
      id: raw.id,
      type: raw.type,
      cameraId: raw.cameraId,
      trackingId: raw.trackingId ?? null,
      timestamp: raw.timestamp,
      payload: raw.payload ?? {},
    });
  }
}
