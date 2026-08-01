import { UUID, ISODateString, BoundingBox } from '../types';
import { CameraStatus, EdgeStatus, AlertSeverity } from '../enums';

export type EventSource = 'edge' | 'backend' | 'cloud';

export interface BaseEvent {
  readonly eventId: UUID;
  readonly timestamp: ISODateString;
  readonly tenantId: UUID;
  readonly version: 1;
  readonly correlationId: UUID;
  readonly source: EventSource;
}

export interface CameraConnectedEvent extends BaseEvent {
  readonly type: 'vision.camera.connected';
  readonly cameraId: UUID;
  readonly edgeBoxId: UUID;
  readonly status: CameraStatus;
}

export interface CameraDisconnectedEvent extends BaseEvent {
  readonly type: 'vision.camera.disconnected';
  readonly cameraId: UUID;
  readonly edgeBoxId: UUID;
}

export interface AlertCreatedEvent extends BaseEvent {
  readonly type: 'vision.alert.created';
  readonly alertId: UUID;
  readonly ruleId: UUID;
  readonly severity: AlertSeverity;
}

export interface AlertResolvedEvent extends BaseEvent {
  readonly type: 'vision.alert.resolved';
  readonly alertId: UUID;
  readonly resolvedBy: UUID;
}

export interface MotionDetectedEvent extends BaseEvent {
  readonly type: 'vision.camera.motion_detected';
  readonly cameraId: UUID;
  readonly zoneId: UUID;
}

export interface PersonDetectedEvent extends BaseEvent {
  readonly type: 'vision.camera.person_detected';
  readonly cameraId: UUID;
  readonly confidence: number;
  readonly boundingBox?: BoundingBox;
}

export interface EdgeOnlineEvent extends BaseEvent {
  readonly type: 'vision.edge.online';
  readonly edgeBoxId: UUID;
  readonly siteId: UUID;
  readonly status: EdgeStatus;
}

export interface EdgeOfflineEvent extends BaseEvent {
  readonly type: 'vision.edge.offline';
  readonly edgeBoxId: UUID;
  readonly siteId: UUID;
}

export type VisionPlatformEvent = 
  | CameraConnectedEvent 
  | CameraDisconnectedEvent 
  | AlertCreatedEvent 
  | AlertResolvedEvent 
  | MotionDetectedEvent 
  | PersonDetectedEvent 
  | EdgeOnlineEvent 
  | EdgeOfflineEvent;
