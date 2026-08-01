import { z } from 'zod';
import { envSchema } from '../env/schema';

export type EnvConfig = z.infer<typeof envSchema>;

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type StorageProvider = 'local' | 's3';
export type Environment = 'development' | 'production' | 'test';

export interface AppConfig {
  readonly name: string;
  readonly port: number;
  readonly env: Environment;
  readonly logLevel: LogLevel;
}

export interface DatabaseConfig {
  readonly url: string;
}

export interface MqttConfig {
  readonly url: string;
}

export interface AuthConfig {
  readonly jwtSecret: string;
  readonly jwtExpiresIn: string;
  readonly jwtRefreshExpiresIn: string;
  readonly jwtIssuer: string;
  readonly jwtAudience: string;
  readonly jwtAlgorithm: 'HS256' | 'RS256';
  readonly argon2: {
    readonly memoryCost: number;
    readonly timeCost: number;
    readonly parallelism: number;
  };
  readonly passwordPolicy: {
    readonly minLength: number;
    readonly requireUppercase: boolean;
    readonly requireLowercase: boolean;
    readonly requireNumber: boolean;
    readonly requireSpecial: boolean;
  };
  readonly cookie: {
    readonly secure: boolean;
    readonly httpOnly: boolean;
    readonly sameSite: 'lax' | 'strict' | 'none';
  };
}

export interface StorageConfig {
  readonly provider: StorageProvider;
  readonly s3Endpoint?: string;
  readonly s3Bucket?: string;
  readonly s3AccessKey?: string;
  readonly s3SecretKey?: string;
}

export interface FeatureFlags {
  readonly enableEdge: boolean;
  readonly enableNotifications: boolean;
  readonly enableAnalytics: boolean;
  readonly enableAudit: boolean;
  readonly enableObjectDetection: boolean;
}

export interface VisionOSConfig {
  readonly app: AppConfig;
  readonly database: DatabaseConfig;
  readonly mqtt: MqttConfig;
  readonly auth: AuthConfig;
  readonly storage: StorageConfig;
  readonly features: FeatureFlags;
}
