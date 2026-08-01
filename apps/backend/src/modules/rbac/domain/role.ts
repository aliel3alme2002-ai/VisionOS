export interface Role {
  readonly id: string;
  readonly tenantId: string | null;
  readonly name: string;
  readonly description: string;
  readonly isSystem: boolean;
}
