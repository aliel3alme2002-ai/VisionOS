import { MqttConfig, EnvConfig } from '../types';

export const createMqttConfig = (env: EnvConfig): MqttConfig => Object.freeze({
  url: env.MQTT_URL,
});
