import { EdgeStatus } from '../value-objects/edge-status';
import { EdgeCapability } from './edge-capability';
import { DeploymentSlot } from './deployment-slot';

import { EdgeRegisteredEvent } from '../events/edge-registered.event';
import { EdgeHeartbeatReceivedEvent } from '../events/edge-heartbeat-received.event';
import { DeploymentAssignedEvent } from '../events/deployment-assigned.event';

export interface EdgeNodeProps {
  id: string;
  organizationId: string;
  name: string;
  hostname: string;
  ipAddress: string;
  status?: EdgeStatus;
  version?: string;
  heartbeatAt?: Date;
  capabilities?: EdgeCapability;
  deploymentSlots?: DeploymentSlot[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class EdgeNode {
  public readonly id: string;
  public readonly organizationId: string;
  private _name: string;
  private _hostname: string;
  private _ipAddress: string;
  private _status: EdgeStatus;
  private _version: string;
  private _heartbeatAt: Date;
  private _capabilities: EdgeCapability;
  private _deploymentSlots: DeploymentSlot[];
  public readonly createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;
  private _domainEvents: any[] = [];

  constructor(props: EdgeNodeProps) {
    this.id = props.id;
    this.organizationId = props.organizationId;
    this._name = props.name;
    this._hostname = props.hostname;
    this._ipAddress = props.ipAddress;
    this._status = props.status ?? EdgeStatus.online();
    this._version = props.version ?? '1.0.0';
    this._heartbeatAt = props.heartbeatAt ?? new Date();
    this._capabilities = props.capabilities ?? new EdgeCapability();
    this._deploymentSlots = props.deploymentSlots ?? [];
    this.createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._deletedAt = props.deletedAt ?? null;
  }

  public get name(): string { return this._name; }
  public get hostname(): string { return this._hostname; }
  public get ipAddress(): string { return this._ipAddress; }
  public get status(): EdgeStatus { return this._status; }
  public get version(): string { return this._version; }
  public get heartbeatAt(): Date { return this._heartbeatAt; }
  public get capabilities(): EdgeCapability { return this._capabilities; }
  public get deploymentSlots(): readonly DeploymentSlot[] { return [...this._deploymentSlots]; }
  public get updatedAt(): Date { return this._updatedAt; }
  public get deletedAt(): Date | null { return this._deletedAt; }
  public get domainEvents(): any[] { return [...this._domainEvents]; }

  public clearDomainEvents(): void { this._domainEvents = []; }
  public isDeleted(): boolean { return this._deletedAt !== null; }

  public static register(props: EdgeNodeProps): EdgeNode {
    const node = new EdgeNode(props);
    node._domainEvents.push(new EdgeRegisteredEvent(node.id, node.organizationId, node.name));
    return node;
  }

  public recordHeartbeat(): void {
    this._heartbeatAt = new Date();
    this._status = EdgeStatus.online();
    this._updatedAt = new Date();
    this._domainEvents.push(new EdgeHeartbeatReceivedEvent(this.id, this._heartbeatAt));
  }

  public addDeploymentSlot(slot: DeploymentSlot): void {
    this._deploymentSlots.push(slot);
    this._updatedAt = new Date();
    this._domainEvents.push(new DeploymentAssignedEvent(this.id, slot.id, slot.runtime));
  }

  public delete(): void {
    this._deletedAt = new Date();
    this._status = EdgeStatus.offline();
    this._updatedAt = new Date();
  }
}
