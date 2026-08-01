import { z } from 'zod';

export const PermissionDtoSchema = z.object({
  id: z.string(),
  module: z.string(),
  resource: z.string(),
  action: z.string(),
  identifier: z.string(),
  description: z.string(),
  group: z.string(),
  isSystem: z.boolean(),
});
export type PermissionDto = z.infer<typeof PermissionDtoSchema>;

export const RoleDtoSchema = z.object({
  id: z.string(),
  tenantId: z.string().nullable(),
  name: z.string(),
  description: z.string(),
  isSystem: z.boolean(),
  permissions: z.array(z.string()).optional(), // Permission identifiers
});
export type RoleDto = z.infer<typeof RoleDtoSchema>;

export const RoleAssignmentDtoSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
  tenantId: z.string().nullable(),
});
export type RoleAssignmentDto = z.infer<typeof RoleAssignmentDtoSchema>;
