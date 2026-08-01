import { Permission } from './permission';

export interface PermissionGroupProps {
  id: string;
  name: string;
  description?: string | null;
  permissions?: Permission[];
}

export class PermissionGroup {
  public readonly id: string;
  private _name: string;
  private _description: string | null;
  private _permissions: Permission[];

  constructor(props: PermissionGroupProps) {
    this.id = props.id;
    this._name = props.name;
    this._description = props.description ?? null;
    this._permissions = props.permissions ?? [];
  }

  public get name(): string { return this._name; }
  public get description(): string | null { return this._description; }
  public get permissions(): readonly Permission[] { return [...this._permissions]; }

  public addPermission(permission: Permission): void {
    if (!this._permissions.some((p) => p.id === permission.id)) {
      this._permissions.push(permission);
    }
  }

  public removePermission(permissionId: string): void {
    this._permissions = this._permissions.filter((p) => p.id !== permissionId);
  }
}
