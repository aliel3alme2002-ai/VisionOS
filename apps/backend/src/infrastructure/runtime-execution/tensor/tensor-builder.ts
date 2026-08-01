import { Injectable } from '@nestjs/common';
import { TensorConverter } from './tensor-converter';
import { TensorLayout } from './tensor-layout';

export interface ConstructedTensor {
  shape: number[];
  layout: TensorLayout;
  data: Float32Array;
}

@Injectable()
export class TensorBuilder {
  constructor(private readonly converter: TensorConverter) {}

  public buildBatchTensor(floatPixels: Float32Array, width: number, height: number): ConstructedTensor {
    const nchwData = this.converter.convertHwcToNchw(floatPixels, width, height);
    return {
      shape: [1, 3, height, width],
      layout: 'NCHW',
      data: nchwData,
    };
  }
}
