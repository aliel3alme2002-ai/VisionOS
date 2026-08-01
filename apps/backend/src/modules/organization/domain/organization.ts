export interface Organization {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
