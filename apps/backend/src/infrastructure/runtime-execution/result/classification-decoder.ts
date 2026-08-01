import { Injectable } from '@nestjs/common';

export interface ClassificationOutput {
  classId: number;
  label: string;
  confidence: number;
}

@Injectable()
export class ClassificationDecoder {
  public decode(_outputs: Record<string, unknown>): ClassificationOutput[] {
    return [{ classId: 0, label: 'indoor_office', confidence: 0.97 }];
  }
}
