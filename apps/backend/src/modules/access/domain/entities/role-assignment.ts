export interface RoleAssignmentProps {
  id: string;
  userId: string;
  roleId: string;
  organizationId: string;
  assignedBy: string;
  assignedAt?: Date;
  expiresAt?: Date | null;
}

export class RoleAssignment {
  public readonly id: string;
  public readonly userId: string;
  public readonly roleId: string;
  public readonly organizationId: string;
  public readonly assignedBy: string;
  public readonly assignedAt: Date;
  public readonly expiresAt: Date | null;

  constructor(props: RoleAssignmentProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.roleId = props.roleId;
    this.organizationId = props.organizationId;
    this.assignedBy = props.assignedBy;
    this.assignedAt = props.assignedAt ?? new Date();
    this.expiresAt = props.expiresAt ?? null;
  }

  public isExpired(): boolean {
    if (!this.expiresAt) return false;
    return new Date() > this.expiresAt;
  }
}
