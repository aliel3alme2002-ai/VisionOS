import { PermissionScope } from './permission-scope';

export interface PermissionProps {
  id: string;
  resource: string;
  action: string;
  scope?: PermissionScope;
  description?: string | null;
}

export class Permission {
  public readonly id: string;
  public readonly resource: string;
  public readonly action: string;
  public readonly scope: PermissionScope;
  public readonly description: string | null;

  constructor(props: PermissionProps) {
    this.id = props.id;
    this.resource = props.resource.toLowerCase();
    this.action = props.action.toLowerCase();
    this.scope = props.scope ?? PermissionScope.organization();
    this.description = props.description ?? null;
  }

  public toPermissionString(): string {
    return `${this.resource}.${this.action}:${this.scope.getValue().toLowerCase()}`;
  }
}
