import { MqttConfig } from '@visionos/config';
import { VisionPlatformEvent } from '@visionos/contracts';

export interface IMqttClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  publish(topic: string, event: VisionPlatformEvent, options?: PublishOptions): Promise<void>;
  subscribe(topic: string, handler: (payload: VisionPlatformEvent) => void): Promise<void>;
  unsubscribe(topic: string): Promise<void>;
}

export interface PublishOptions {
  readonly qos?: 0 | 1 | 2;
  readonly retain?: boolean;
}

export interface MqttClientOptions extends MqttConfig {
  readonly reconnectPeriod?: number;
  readonly connectTimeout?: number;
}
