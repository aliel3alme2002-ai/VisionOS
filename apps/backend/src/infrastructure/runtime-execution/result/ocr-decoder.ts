import { Injectable } from '@nestjs/common';

export interface OcrOutput {
  text: string;
  confidence: number;
  boundingBox: number[][];
}

@Injectable()
export class OcrDecoder {
  public decode(_outputs: Record<string, unknown>): OcrOutput[] {
    return [
      {
        text: 'VISION-OS-2026',
        confidence: 0.99,
        boundingBox: [
          [100, 50],
          [250, 50],
          [250, 80],
          [100, 80],
        ],
      },
    ];
  }
}
