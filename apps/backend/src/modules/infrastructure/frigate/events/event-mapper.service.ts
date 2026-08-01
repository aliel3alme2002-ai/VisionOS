import { Injectable } from '@nestjs/common';
import { FrigateEvent } from '../models/frigate-event';
import { InferenceResponse } from '../../../integration/models/inference-response';

@Injectable()
export class FrigateEventMapper {
  toInferenceResponse(event: FrigateEvent): InferenceResponse {
    return {
      requestId: event.eventId,
      modelId: 'frigate-yolo-v8',
      detections: [
        {
          label: event.label,
          confidence: event.score,
          boundingBox: { x: 0, y: 0, w: 100, h: 100 }
        }
      ],
      latencyMs: 15
    };
  }
}
