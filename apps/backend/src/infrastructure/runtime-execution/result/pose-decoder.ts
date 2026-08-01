import { Injectable } from '@nestjs/common';

export interface Keypoint2D {
  id: number;
  name: string;
  x: number;
  y: number;
  score: number;
}

export interface PoseOutput {
  personId: number;
  confidence: number;
  keypoints: Keypoint2D[];
}

@Injectable()
export class PoseDecoder {
  public decode(_outputs: Record<string, unknown>): PoseOutput[] {
    return [
      {
        personId: 1,
        confidence: 0.95,
        keypoints: [
          { id: 0, name: 'nose', x: 200, y: 160, score: 0.99 },
          { id: 1, name: 'left_eye', x: 195, y: 155, score: 0.98 },
          { id: 2, name: 'right_eye', x: 205, y: 155, score: 0.98 },
        ],
      },
    ];
  }
}
