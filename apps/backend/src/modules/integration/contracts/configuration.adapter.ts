export interface ConfigurationAdapter {
  loadConfiguration(deviceId: string): Promise<Record<string, unknown>>;
  saveConfiguration(deviceId: string, config: Record<string, unknown>): Promise<void>;
}
