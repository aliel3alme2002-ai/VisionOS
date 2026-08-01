import { z } from 'zod';
import { MembershipDtoSchema, TenantContextDtoSchema } from '../../organization/dto/organization.dto';

export const UserDtoSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  displayName: z.string(),
  avatarUrl: z.string().nullable(),
  language: z.string(),
  timezone: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type UserDto = z.infer<typeof UserDtoSchema>;

export const UserProfileDtoSchema = z.object({
  userId: z.string(),
  phone: z.string().nullable(),
  jobTitle: z.string().nullable(),
  preferences: z.record(z.any()),
  notificationSettings: z.record(z.boolean()),
});
export type UserProfileDto = z.infer<typeof UserProfileDtoSchema>;

export const InvitationDtoSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  email: z.string().email(),
  invitedBy: z.string(),
  expiresAt: z.date(),
  status: z.enum(['PENDING', 'ACCEPTED', 'EXPIRED', 'REVOKED']),
});
export type InvitationDto = z.infer<typeof InvitationDtoSchema>;

// Note: AuthorizationContext is typically not exposed fully via DTOs due to size, 
// but we define the context DTO per requirements
export const UserContextDtoSchema = z.object({
  identity: z.object({
    userId: z.string(),
    tenantId: z.string().optional(),
    sessionId: z.string(),
    tokenVersion: z.number(),
    roles: z.array(z.string()),
  }),
  membership: MembershipDtoSchema.nullable(),
  tenantContext: TenantContextDtoSchema.nullable(),
  authorizationContext: z.object({
    roles: z.array(z.string()),
    permissions: z.array(z.string()),
  }).nullable(),
});
export type UserContextDto = z.infer<typeof UserContextDtoSchema>;
