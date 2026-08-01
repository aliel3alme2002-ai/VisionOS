import { Injectable } from '@nestjs/common';
import { LoadedImageData } from './image-loader';

export interface ProcessedTensor {
  shape: number[];
  data: Float32Array;
  scaleFactor: number;
  padWidth: number;
  padHeight: number;
}

@Injectable()
export class TensorPreprocessor {
  public preprocess(image: LoadedImageData, targetWidth = 640, targetHeight = 640): ProcessedTensor {
    const totalPixels = 1 * 3 * targetHeight * targetWidth;
    const floatData = new Float32Array(totalPixels);

    // Letterbox & Normalization simulation [0, 1]
    const scaleFactor = Math.min(targetWidth / image.width, targetHeight / image.height);
    const padWidth = Math.floor((targetWidth - image.width * scaleFactor) / 2);
    const padHeight = Math.floor((targetHeight - image.height * scaleFactor) / 2);

    for (let i = 0; i < floatData.length; i++) {
      floatData[i] = (image.data[i % image.data.length] ?? 0) / 255.0;
    }

    return {
      shape: [1, 3, targetHeight, targetWidth],
      data: floatData,
      scaleFactor,
      padWidth,
      padHeight,
    };
  }
}
