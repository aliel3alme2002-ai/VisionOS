export interface Hotel {
  readonly id: string;
  readonly organizationId: string;
  readonly name: string;
  readonly code: string;
  readonly timezone: string;
  readonly status: 'ACTIVE' | 'INACTIVE';
}
