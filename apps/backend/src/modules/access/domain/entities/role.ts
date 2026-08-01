import { Permission } from './permission';
import { RoleUpdatedEvent } from '../events/role-updated.event';
import { RoleDeletedEvent } from '../events/role-deleted.event';
import { RoleRestoredEvent } from '../events/role-restored.event';

export interface RoleProps {
  id: string;
  organizationId?: string | null;
  name: string;
  description?: string | null;
  systemRole?: boolean;
  parentRoleId?: string | null;
  permissions?: Permission[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class Role {
  public readonly id: string;
  public readonly organizationId: string | null;
  private _name: string;
  private _description: string | null;
  public readonly systemRole: boolean;
  public readonly parentRoleId: string | null;
  private _permissions: Permission[];
  public readonly createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;
  private _domainEvents: any[] = [];

  constructor(props: RoleProps) {
    this.id = props.id;
    this.organizationId = props.organizationId ?? null;
    this._name = props.name;
    this._description = props.description ?? null;
    this.systemRole = props.systemRole ?? false;
    this.parentRoleId = props.parentRoleId ?? null;
    this._permissions = props.permissions ?? [];
    this.createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._deletedAt = props.deletedAt ?? null;
  }

  public get name(): string { return this._name; }
  public get description(): string | null { return this._description; }
  public get permissions(): readonly Permission[] { return [...this._permissions]; }
  public get updatedAt(): Date { return this._updatedAt; }
  public get deletedAt(): Date | null { return this._deletedAt; }
  public get domainEvents(): any[] { return [...this._domainEvents]; }

  public clearDomainEvents(): void { this._domainEvents = []; }

  public isDeleted(): boolean { return this._deletedAt !== null; }

  public update(name?: string, description?: string | null): void {
    if (this.systemRole) {
      throw new Error('System roles are immutable and cannot be updated');
    }
    if (this.isDeleted()) {
      throw new Error('Cannot update deleted role');
    }
    if (name) this._name = name;
    if (description !== undefined) this._description = description;
    this._updatedAt = new Date();
    this._domainEvents.push(new RoleUpdatedEvent(this.id, this._name));
  }

  public addPermission(permission: Permission): void {
    if (this.systemRole) throw new Error('Cannot modify permissions of system roles');
    if (!this._permissions.some((p) => p.id === permission.id)) {
      this._permissions.push(permission);
      this._updatedAt = new Date();
    }
  }

  public removePermission(permissionId: string): void {
    if (this.systemRole) throw new Error('Cannot modify permissions of system roles');
    this._permissions = this._permissions.filter((p) => p.id !== permissionId);
    this._updatedAt = new Date();
  }

  public delete(): void {
    if (this.systemRole) throw new Error('System roles cannot be deleted');
    if (this.isDeleted()) throw new Error('Role is already deleted');
    this._deletedAt = new Date();
    this._updatedAt = new Date();
    this._domainEvents.push(new RoleDeletedEvent(this.id));
  }

  public restore(): void {
    if (!this.isDeleted()) throw new Error('Role is not deleted');
    this._deletedAt = null;
    this._updatedAt = new Date();
    this._domainEvents.push(new RoleRestoredEvent(this.id));
  }
}
