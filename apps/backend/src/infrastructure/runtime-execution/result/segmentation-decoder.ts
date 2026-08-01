import { Injectable } from '@nestjs/common';

export interface SegmentationOutput {
  classId: number;
  label: string;
  confidence: number;
  maskPolygon: number[][];
}

@Injectable()
export class SegmentationDecoder {
  public decode(_outputs: Record<string, unknown>): SegmentationOutput[] {
    return [
      {
        classId: 0,
        label: 'person',
        confidence: 0.91,
        maskPolygon: [
          [120, 140],
          [310, 140],
          [310, 480],
          [120, 480],
        ],
      },
    ];
  }
}
