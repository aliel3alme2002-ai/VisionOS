import { Injectable } from '@nestjs/common';
import { LocalInferenceResponse } from '../models/inference-response';
import { InferenceResponse } from '../../../integration/models/inference-response';

@Injectable()
export class PostprocessingService {
  async process(response: LocalInferenceResponse): Promise<InferenceResponse> {
    return {
      requestId: response.requestId,
      modelId: response.modelId,
      detections: response.detections.map(d => ({
        label: d.label,
        confidence: d.confidence,
        boundingBox: { x: d.box[0], y: d.box[1], w: d.box[2], h: d.box[3] }
      })),
      latencyMs: response.latency
    };
  }
}
