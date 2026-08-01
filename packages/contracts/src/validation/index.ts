import { z } from 'zod';
import { 
  TenantStatus, UserRole, EdgeStatus, CameraStatus, AlertStatus, 
  AlertSeverity, NotificationChannel, NotificationStatus, LicenseStatus, DeviceType 
} from '../enums';
import { UUID, JsonValue, UUIDBrand } from '../types';

export const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(jsonValueSchema),
    z.record(z.string(), jsonValueSchema),
  ])
);

export const uuidSchema = z.string().uuid() as unknown as z.ZodType<UUID>;
export const isoDateStringSchema = z.string().datetime();

export const baseDtoSchema = z.object({
  id: uuidSchema,
  createdAt: isoDateStringSchema,
  updatedAt: isoDateStringSchema,
  deletedAt: isoDateStringSchema.optional(),
  createdBy: uuidSchema,
  updatedBy: uuidSchema,
  deletedBy: uuidSchema.optional(),
});

export const tenantSchema = baseDtoSchema.extend({
  name: z.string().min(1).max(255),
  status: z.nativeEnum(TenantStatus),
});

export const userSchema = baseDtoSchema.extend({
  tenantId: uuidSchema,
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
});

export const siteSchema = baseDtoSchema.extend({
  tenantId: uuidSchema,
  name: z.string().min(1).max(255),
  timezone: z.string(),
});

export const buildingSchema = baseDtoSchema.extend({
  tenantId: uuidSchema,
  siteId: uuidSchema,
  name: z.string().min(1).max(255),
});

export const floorSchema = baseDtoSchema.extend({
  tenantId: uuidSchema,
  buildingId: uuidSchema,
  name: z.string().min(1).max(255),
  level: z.number().int(),
});

export const zoneSchema = baseDtoSchema.extend({
  tenantId: uuidSchema,
  siteId: uuidSchema.optional(),
  floorId: uuidSchema.optional(),
  name: z.string().min(1).max(255),
});

export const edgeBoxSchema = baseDtoSchema.extend({
  tenantId: uuidSchema,
  siteId: uuidSchema,
  macAddress: z.string().regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/),
  status: z.nativeEnum(EdgeStatus),
});

export const cameraSchema = baseDtoSchema.extend({
  tenantId: uuidSchema,
  zoneId: uuidSchema,
  edgeBoxId: uuidSchema,
  streamUrl: z.string().url(),
  status: z.nativeEnum(CameraStatus),
});

export const deviceSchema = baseDtoSchema.extend({
  tenantId: uuidSchema,
  zoneId: uuidSchema,
  type: z.nativeEnum(DeviceType),
});

export const eventSchema = baseDtoSchema.extend({
  tenantId: uuidSchema,
  sourceId: uuidSchema,
  type: z.string(),
  payload: z.record(z.string(), jsonValueSchema),
  timestamp: isoDateStringSchema,
});

export const ruleSchema = baseDtoSchema.extend({
  tenantId: uuidSchema,
  name: z.string().min(1).max(255),
  conditions: z.record(z.string(), jsonValueSchema),
  actions: z.record(z.string(), jsonValueSchema),
  status: z.boolean(),
});

export const alertSchema = baseDtoSchema.extend({
  tenantId: uuidSchema,
  ruleId: uuidSchema,
  eventId: uuidSchema,
  status: z.nativeEnum(AlertStatus),
  severity: z.nativeEnum(AlertSeverity),
});

export const notificationSchema = baseDtoSchema.extend({
  tenantId: uuidSchema,
  userId: uuidSchema,
  alertId: uuidSchema,
  channel: z.nativeEnum(NotificationChannel),
  status: z.nativeEnum(NotificationStatus),
});

export const licenseSchema = baseDtoSchema.extend({
  tenantId: uuidSchema,
  tier: z.string().min(1).max(255),
  validUntil: isoDateStringSchema,
  status: z.nativeEnum(LicenseStatus),
});
