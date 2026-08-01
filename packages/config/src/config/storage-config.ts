import { StorageConfig, EnvConfig } from '../types';

export const createStorageConfig = (env: EnvConfig): StorageConfig => {
  const config: Record<string, any> = { provider: env.STORAGE_PROVIDER };
  
  if (env.S3_ENDPOINT !== undefined) config.s3Endpoint = env.S3_ENDPOINT;
  if (env.S3_BUCKET !== undefined) config.s3Bucket = env.S3_BUCKET;
  if (env.S3_ACCESS_KEY !== undefined) config.s3AccessKey = env.S3_ACCESS_KEY;
  if (env.S3_SECRET_KEY !== undefined) config.s3SecretKey = env.S3_SECRET_KEY;

  return Object.freeze(config as StorageConfig);
};
