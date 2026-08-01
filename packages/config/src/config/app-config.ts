import { AppConfig, EnvConfig } from '../types';

export const createAppConfig = (env: EnvConfig): AppConfig => Object.freeze({
  name: env.APP_NAME,
  port: env.APP_PORT,
  env: env.NODE_ENV,
  logLevel: env.LOG_LEVEL,
});
