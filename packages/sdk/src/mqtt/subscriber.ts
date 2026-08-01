import { IMqttClient } from './client';
import { VisionPlatformEvent } from '@visionos/contracts';

export class MqttSubscriber {
  constructor(private readonly client: IMqttClient) {}

  public async subscribe(topic: string, handler: (payload: VisionPlatformEvent) => void): Promise<void> {
    await this.client.subscribe(topic, handler);
  }

  public async unsubscribe(topic: string): Promise<void> {
    await this.client.unsubscribe(topic);
  }
}
