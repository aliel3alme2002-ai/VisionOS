import { loadEnv, validateEnv } from '../env';
import { VisionOSConfig, EnvConfig } from '../types';
import { createAppConfig } from './app-config';
import { createDatabaseConfig } from './database-config';
import { createMqttConfig } from './mqtt-config';
import { createAuthConfig } from './auth-config';
import { createStorageConfig } from './storage-config';
import { createFeatureFlags } from '../feature-flags';

export * from './app-config';
export * from './database-config';
export * from './mqtt-config';
export * from './auth-config';
export * from './storage-config';

// Global init function (loads env once)
let cachedConfig: VisionOSConfig | null = null;

export function loadConfig(overrides?: Partial<Record<string, string | undefined>>): VisionOSConfig {
  if (cachedConfig && !overrides) {
    return cachedConfig;
  }

  loadEnv();
  
  const processEnv = { ...process.env, ...overrides };
  const env: EnvConfig = validateEnv(processEnv);

  const config: VisionOSConfig = Object.freeze({
    app: createAppConfig(env),
    database: createDatabaseConfig(env),
    mqtt: createMqttConfig(env),
    auth: createAuthConfig(env),
    storage: createStorageConfig(env),
    features: createFeatureFlags(env),
  });

  if (!overrides) {
    cachedConfig = config;
  }

  return config;
}
