export interface TenantContext {
  readonly tenantId: string; // Synonymous with organizationId globally
  readonly organizationId: string;
  readonly membershipId: string;
  readonly currentHotelId?: string | undefined;
  readonly currentDepartmentId?: string | undefined;
}
