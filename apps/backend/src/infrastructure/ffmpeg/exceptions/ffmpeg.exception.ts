export class FfmpegException extends Error {
  constructor(message: string, public readonly code = 'FFMPEG_ERROR') {
    super(message);
    this.name = 'FfmpegException';
  }
}
