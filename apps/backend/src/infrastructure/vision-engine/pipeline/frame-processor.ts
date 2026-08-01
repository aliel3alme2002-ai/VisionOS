import { Injectable } from '@nestjs/common';
import { TensorBuilder } from '../../runtime-execution/tensor/tensor-builder';
import { ImageNormalizer } from '../../runtime-execution/image/image-normalizer';
import { Frame } from '../../video/frame/frame';

@Injectable()
export class FrameProcessor {
  constructor(
    private readonly normalizer: ImageNormalizer,
    private readonly tensorBuilder: TensorBuilder,
  ) {}

  public processFrameToTensor(frame: Frame): Float32Array {
    const floatPixels = this.normalizer.normalizeToFloat32(frame.buffer);
    const constructed = this.tensorBuilder.buildBatchTensor(floatPixels, frame.width, frame.height);
    return constructed.data;
  }
}
