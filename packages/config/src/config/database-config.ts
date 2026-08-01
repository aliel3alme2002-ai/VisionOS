import { DatabaseConfig, EnvConfig } from '../types';

export const createDatabaseConfig = (env: EnvConfig): DatabaseConfig => Object.freeze({
  url: env.DATABASE_URL,
});
