import { Injectable } from '@nestjs/common';
import { RuntimeClient } from './runtime-client';

@Injectable()
export class RuntimeFactory {
  createClient(engine: string): RuntimeClient {
    return {
      id: 'client_' + engine + '_' + Date.now().toString(),
      engine,
      connect: async () => true,
      disconnect: async () => {},
      loadModel: async () => {},
      unloadModel: async () => {},
      infer: async (req) => ({
        requestId: req.requestId,
        runtimeId: 'dummy_runtime',
        modelId: 'dummy_model',
        modelVersion: '1.0',
        processingTime: 10,
        latency: 12,
        detections: [],
        metadata: {}
      })
    };
  }
}
