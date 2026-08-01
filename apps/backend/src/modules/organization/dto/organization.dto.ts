import { z } from 'zod';

export const OrganizationDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type OrganizationDto = z.infer<typeof OrganizationDtoSchema>;

export const HotelDtoSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  name: z.string(),
  code: z.string(),
  timezone: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
});
export type HotelDto = z.infer<typeof HotelDtoSchema>;

export const DepartmentDtoSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  name: z.string(),
  code: z.string(),
  description: z.string().nullable(),
});
export type DepartmentDto = z.infer<typeof DepartmentDtoSchema>;

export const MembershipDtoSchema = z.object({
  id: z.string(),
  userId: z.string(),
  organizationId: z.string(),
  roleIds: z.array(z.string()),
  status: z.enum(['ACTIVE', 'INVITED', 'SUSPENDED']),
  defaultHotelId: z.string().optional(),
  defaultDepartmentId: z.string().optional(),
  lastSelectedContext: z.string().optional(),
});
export type MembershipDto = z.infer<typeof MembershipDtoSchema>;

export const TenantContextDtoSchema = z.object({
  tenantId: z.string(),
  organizationId: z.string(),
  membershipId: z.string(),
  currentHotelId: z.string().optional(),
  currentDepartmentId: z.string().optional(),
});
export type TenantContextDto = z.infer<typeof TenantContextDtoSchema>;
