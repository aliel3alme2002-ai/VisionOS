import { Injectable } from '@nestjs/common';
import { RawImageBuffer } from '../utilities/image-utils';
import { Letterbox, LetterboxResult } from '../utilities/letterbox';

@Injectable()
export class ImageResizer {
  public resizeWithLetterbox(image: RawImageBuffer, targetWidth = 640, targetHeight = 640): LetterboxResult {
    return Letterbox.apply(image.pixels, image.width, image.height, targetWidth, targetHeight);
  }
}
