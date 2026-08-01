import { z } from 'zod';

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    tenantId: z.string().optional(),
    roles: z.array(z.string()),
  }),
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const RefreshRequestSchema = z.object({
  refreshToken: z.string(),
});
export type RefreshRequest = z.infer<typeof RefreshRequestSchema>;

export const RefreshResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type RefreshResponse = z.infer<typeof RefreshResponseSchema>;

export const GetMeResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  tenantId: z.string().optional(),
  roles: z.array(z.string()),
});
export type GetMeResponse = z.infer<typeof GetMeResponseSchema>;

export const SessionResponseSchema = z.object({
  sessionId: z.string(),
  deviceName: z.string().optional(),
  platform: z.string().optional(),
  browser: z.string().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  createdAt: z.date(),
  lastUsedAt: z.date(),
  expiresAt: z.date(),
  status: z.enum(['ACTIVE', 'REVOKED', 'EXPIRED', 'COMPROMISED']),
});
export type SessionResponse = z.infer<typeof SessionResponseSchema>;

export const SessionListResponseSchema = z.object({
  sessions: z.array(SessionResponseSchema),
});
export type SessionListResponse = z.infer<typeof SessionListResponseSchema>;

export const RevokeSessionRequestSchema = z.object({
  sessionId: z.string(),
});
export type RevokeSessionRequest = z.infer<typeof RevokeSessionRequestSchema>;

export const TerminateOtherSessionsRequestSchema = z.object({
  currentSessionId: z.string(),
});
export type TerminateOtherSessionsRequest = z.infer<typeof TerminateOtherSessionsRequestSchema>;
