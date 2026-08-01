import { FeatureFlags, EnvConfig } from '../types';

export const createFeatureFlags = (env: EnvConfig): FeatureFlags => Object.freeze({
  enableEdge: env.ENABLE_EDGE,
  enableNotifications: env.ENABLE_NOTIFICATIONS,
  enableAnalytics: env.ENABLE_ANALYTICS,
  enableAudit: env.ENABLE_AUDIT,
  enableObjectDetection: env.ENABLE_OBJECT_DETECTION,
});
