export interface Membership {
  readonly id: string;
  readonly userId: string;
  readonly organizationId: string;
  readonly roleIds: string[];
  readonly status: 'ACTIVE' | 'INVITED' | 'SUSPENDED';
  readonly defaultHotelId?: string | undefined;
  readonly defaultDepartmentId?: string | undefined;
  readonly lastSelectedContext?: string | undefined;
}
