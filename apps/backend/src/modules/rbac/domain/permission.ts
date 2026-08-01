export interface Permission {
  readonly id: string;
  readonly module: string;
  readonly resource: string;
  readonly action: string;
  readonly identifier: string; // e.g. "camera:view"
  readonly description: string;
  readonly group: string;
  readonly isSystem: boolean;
}
