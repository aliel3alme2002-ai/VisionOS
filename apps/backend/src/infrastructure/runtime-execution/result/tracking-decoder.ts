import { Injectable } from '@nestjs/common';

export interface TrackingOutput {
  trackId: string;
  classId: number;
  label: string;
  confidence: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  velocity: number;
}

@Injectable()
export class TrackingDecoder {
  public decode(_outputs: Record<string, unknown>): TrackingOutput[] {
    return [
      {
        trackId: 'TRK-001',
        classId: 0,
        label: 'person',
        confidence: 0.93,
        x1: 120,
        y1: 140,
        x2: 310,
        y2: 480,
        velocity: 1.2,
      },
    ];
  }
}
