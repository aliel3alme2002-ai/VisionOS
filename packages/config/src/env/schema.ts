import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  APP_NAME: z.string().default('VisionOS'),
  APP_PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().url(),
  MQTT_URL: z.string().url(),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  STORAGE_PROVIDER: z.enum(['local', 's3']).default('local'),
  S3_ENDPOINT: z.string().url().optional(),
  S3_BUCKET: z.string().optional(),
  S3_ACCESS_KEY: z.string().optional(),
  S3_SECRET_KEY: z.string().optional(),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  ENABLE_EDGE: z.coerce.boolean().default(true),
  ENABLE_NOTIFICATIONS: z.coerce.boolean().default(true),
  ENABLE_ANALYTICS: z.coerce.boolean().default(false),
  ENABLE_AUDIT: z.coerce.boolean().default(true),
  ENABLE_OBJECT_DETECTION: z.coerce.boolean().default(true),
}).superRefine((data, ctx) => {
  if (data.STORAGE_PROVIDER === 's3') {
    if (!data.S3_ENDPOINT) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "S3_ENDPOINT is required when STORAGE_PROVIDER is s3", path: ["S3_ENDPOINT"] });
    if (!data.S3_BUCKET) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "S3_BUCKET is required when STORAGE_PROVIDER is s3", path: ["S3_BUCKET"] });
    if (!data.S3_ACCESS_KEY) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "S3_ACCESS_KEY is required when STORAGE_PROVIDER is s3", path: ["S3_ACCESS_KEY"] });
    if (!data.S3_SECRET_KEY) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "S3_SECRET_KEY is required when STORAGE_PROVIDER is s3", path: ["S3_SECRET_KEY"] });
  }
});
