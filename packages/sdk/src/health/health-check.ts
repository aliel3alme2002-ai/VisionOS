export interface HealthStatus {
  readonly status: 'up' | 'down';
  readonly timestamp: string;
}

export interface SystemHealth {
  readonly database: HealthStatus;
  readonly mqtt: HealthStatus;
}

export const isHealthy = (health: HealthStatus): boolean => {
  return health.status === 'up';
};

export const ping = (): HealthStatus => {
  return { status: 'up', timestamp: new Date().toISOString() };
};

export const database = async (checkDb: () => Promise<boolean>): Promise<HealthStatus> => {
  try {
    const isUp = await checkDb();
    return { status: isUp ? 'up' : 'down', timestamp: new Date().toISOString() };
  } catch {
    return { status: 'down', timestamp: new Date().toISOString() };
  }
};

export const mqtt = async (checkMqtt: () => Promise<boolean>): Promise<HealthStatus> => {
  try {
    const isUp = await checkMqtt();
    return { status: isUp ? 'up' : 'down', timestamp: new Date().toISOString() };
  } catch {
    return { status: 'down', timestamp: new Date().toISOString() };
  }
};
