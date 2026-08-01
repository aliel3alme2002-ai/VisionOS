import { CameraStatus } from '../value-objects/camera-status';
import { CameraHealth } from './camera-health';
import { HealthReport } from './health-report';

import { CameraCreatedEvent } from '../events/camera-created.event';
import { CameraUpdatedEvent } from '../events/camera-updated.event';
import { CameraDeletedEvent } from '../events/camera-deleted.event';
import { CameraMovedEvent } from '../events/camera-moved.event';
import { CameraOnlineEvent } from '../events/camera-online.event';
import { CameraOfflineEvent } from '../events/camera-offline.event';
import { CameraHealthChangedEvent } from '../events/camera-health-changed.event';

export interface CameraProps {
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
  status?: CameraStatus;
  health?: CameraHealth;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class Camera {
  public readonly id: string;
  public readonly organizationId: string;
  private _name: string;
  private _location: string | null;
  private _groupId: string | null;
  private _manufacturer: string | null;
  private _model: string | null;
  private _serialNumber: string | null;
  private _firmwareVersion: string | null;
  private _ipAddress: string;
  private _macAddress: string | null;
  private _rtspUrl: string;
  private _onvifEnabled: boolean;
  private _streamProfileId: string | null;
  private _credentialId: string | null;
  private _edgeNodeId: string | null;
  private _status: CameraStatus;
  private _health: CameraHealth;
  public readonly createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;
  private _domainEvents: any[] = [];

  constructor(props: CameraProps) {
    this.id = props.id;
    this.organizationId = props.organizationId;
    this._name = props.name;
    this._location = props.location ?? null;
    this._groupId = props.groupId ?? null;
    this._manufacturer = props.manufacturer ?? null;
    this._model = props.model ?? null;
    this._serialNumber = props.serialNumber ?? null;
    this._firmwareVersion = props.firmwareVersion ?? null;
    this._ipAddress = props.ipAddress;
    this._macAddress = props.macAddress ?? null;
    this._rtspUrl = props.rtspUrl;
    this._onvifEnabled = props.onvifEnabled ?? true;
    this._streamProfileId = props.streamProfileId ?? null;
    this._credentialId = props.credentialId ?? null;
    this._edgeNodeId = props.edgeNodeId ?? null;
    this._status = props.status ?? CameraStatus.online();
    this._health = props.health ?? new CameraHealth(this._status, new HealthReport());
    this.createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._deletedAt = props.deletedAt ?? null;
  }

  public get name(): string { return this._name; }
  public get location(): string | null { return this._location; }
  public get groupId(): string | null { return this._groupId; }
  public get manufacturer(): string | null { return this._manufacturer; }
  public get model(): string | null { return this._model; }
  public get serialNumber(): string | null { return this._serialNumber; }
  public get firmwareVersion(): string | null { return this._firmwareVersion; }
  public get ipAddress(): string { return this._ipAddress; }
  public get macAddress(): string | null { return this._macAddress; }
  public get rtspUrl(): string { return this._rtspUrl; }
  public get onvifEnabled(): boolean { return this._onvifEnabled; }
  public get streamProfileId(): string | null { return this._streamProfileId; }
  public get credentialId(): string | null { return this._credentialId; }
  public get edgeNodeId(): string | null { return this._edgeNodeId; }
  public get status(): CameraStatus { return this._status; }
  public get health(): CameraHealth { return this._health; }
  public get updatedAt(): Date { return this._updatedAt; }
  public get deletedAt(): Date | null { return this._deletedAt; }
  public get domainEvents(): any[] { return [...this._domainEvents]; }

  public clearDomainEvents(): void { this._domainEvents = []; }
  public isDeleted(): boolean { return this._deletedAt !== null; }

  public static create(props: CameraProps): Camera {
    const cam = new Camera(props);
    cam._domainEvents.push(new CameraCreatedEvent(cam.id, cam.organizationId, cam.name));
    return cam;
  }

  public update(name?: string, location?: string | null, ipAddress?: string, rtspUrl?: string): void {
    if (this.isDeleted()) throw new Error('Cannot update deleted camera');
    if (name) this._name = name;
    if (location !== undefined) this._location = location;
    if (ipAddress) this._ipAddress = ipAddress;
    if (rtspUrl) this._rtspUrl = rtspUrl;
    this._updatedAt = new Date();
    this._domainEvents.push(new CameraUpdatedEvent(this.id, this.organizationId));
  }

  public moveToEdge(targetEdgeNodeId: string | null): void {
    if (this.isDeleted()) throw new Error('Cannot move deleted camera');
    const oldEdgeNodeId = this._edgeNodeId;
    this._edgeNodeId = targetEdgeNodeId;
    this._updatedAt = new Date();
    this._domainEvents.push(new CameraMovedEvent(this.id, oldEdgeNodeId, targetEdgeNodeId));
  }

  public assignGroup(groupId: string | null): void {
    this._groupId = groupId;
    this._updatedAt = new Date();
  }

  public assignStreamProfile(streamProfileId: string | null): void {
    this._streamProfileId = streamProfileId;
    this._updatedAt = new Date();
  }

  public assignCredential(credentialId: string | null): void {
    this._credentialId = credentialId;
    this._updatedAt = new Date();
  }

  public markOnline(): void {
    this._status = CameraStatus.online();
    this._updatedAt = new Date();
    this._domainEvents.push(new CameraOnlineEvent(this.id, this.organizationId));
  }

  public markOffline(): void {
    this._status = CameraStatus.offline();
    this._updatedAt = new Date();
    this._domainEvents.push(new CameraOfflineEvent(this.id, this.organizationId));
  }

  public updateHealth(report: HealthReport): void {
    this._health = new CameraHealth(this._status, report);
    this._updatedAt = new Date();
    this._domainEvents.push(new CameraHealthChangedEvent(this.id, this._status.getValue()));
  }

  public delete(): void {
    if (this.isDeleted()) throw new Error('Camera is already deleted');
    this._deletedAt = new Date();
    this._updatedAt = new Date();
    this._domainEvents.push(new CameraDeletedEvent(this.id, this.organizationId, this._deletedAt));
  }
}
