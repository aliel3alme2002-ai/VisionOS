export interface LetterboxResult {
  paddedImage: Uint8Array;
  targetWidth: number;
  targetHeight: number;
  scaleFactor: number;
  padWidth: number;
  padHeight: number;
}

export class Letterbox {
  public static apply(
    _pixels: Uint8Array,
    srcWidth: number,
    srcHeight: number,
    targetWidth = 640,
    targetHeight = 640,
  ): LetterboxResult {
    const scaleFactor = Math.min(targetWidth / srcWidth, targetHeight / srcHeight);
    const newUnpadW = Math.round(srcWidth * scaleFactor);
    const newUnpadH = Math.round(srcHeight * scaleFactor);

    const padWidth = Math.floor((targetWidth - newUnpadW) / 2);
    const padHeight = Math.floor((targetHeight - newUnpadH) / 2);

    const paddedImage = new Uint8Array(targetWidth * targetHeight * 3);
    paddedImage.fill(114);

    return {
      paddedImage,
      targetWidth,
      targetHeight,
      scaleFactor,
      padWidth,
      padHeight,
    };
  }
}
