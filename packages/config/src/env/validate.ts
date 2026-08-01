import { envSchema } from './schema';
import { EnvConfig } from '../types';

export function validateEnv(env: Record<string, string | undefined>): EnvConfig {
  const parsed = envSchema.safeParse(env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    parsed.error.issues.forEach(issue => {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
    });
    throw new Error('Environment validation failed. See logs for details.');
  }

  return parsed.data;
}
