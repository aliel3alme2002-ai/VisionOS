import { AuthConfig, EnvConfig } from '../types';

export const createAuthConfig = (env: EnvConfig): AuthConfig => Object.freeze({
  jwtSecret: env.JWT_SECRET,
  jwtExpiresIn: env.JWT_EXPIRES_IN,
  jwtRefreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
  jwtIssuer: env.APP_NAME || 'VisionOS',
  jwtAudience: 'visionos-clients',
  jwtAlgorithm: 'HS256',
  argon2: Object.freeze({
    memoryCost: 65536, // 64 MB
    timeCost: 3,
    parallelism: 4,
  }),
  passwordPolicy: Object.freeze({
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecial: true,
  }),
  cookie: Object.freeze({
    secure: env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
  }),
});
