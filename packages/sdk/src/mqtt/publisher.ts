import { IMqttClient, PublishOptions } from './client';
import { VisionPlatformEvent } from '@visionos/contracts';

export class MqttPublisher {
  constructor(private readonly client: IMqttClient) {}

  public async publish(topic: string, event: VisionPlatformEvent, options?: PublishOptions): Promise<void> {
    await this.client.publish(topic, event, options);
  }
}
