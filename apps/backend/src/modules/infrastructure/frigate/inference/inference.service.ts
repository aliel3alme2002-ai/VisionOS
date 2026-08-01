import { Injectable } from '@nestjs/common';
import { InferenceRequest } from '../../../integration/models/inference-request';
import { InferenceResponse } from '../../../integration/models/inference-response';

@Injectable()
export class InferenceService {
  async runInference(request: InferenceRequest): Promise<InferenceResponse> {
    return {
      requestId: request.requestId,
      modelId: request.modelId,
      detections: [
        {
          label: 'person',
          confidence: 0.95,
          boundingBox: { x: 10, y: 10, w: 50, h: 100 }
        }
      ],
      latencyMs: 12
    };
  }
}
