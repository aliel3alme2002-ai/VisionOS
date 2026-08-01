import { FfmpegException } from './ffmpeg.exception';

export class FfmpegTimeoutException extends FfmpegException {
  constructor(streamId: string, timeoutMs: number) {
    super(`RTSP stream connection timed out after ${timeoutMs}ms for stream ${streamId}`, 'FFMPEG_TIMEOUT');
    this.name = 'FfmpegTimeoutException';
  }
}
