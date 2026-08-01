import { Injectable } from '@nestjs/common';

export type SupportedVideoContainer = 'MP4' | 'AVI' | 'MOV' | 'MKV' | 'WEBM';
export type SupportedVideoCodec = 'H264' | 'H265';

export interface DemuxResult {
  container: SupportedVideoContainer;
  codec: SupportedVideoCodec;
  width: number;
  height: number;
  fps: number;
  durationMs: number;
  totalFrames: number;
}

@Injectable()
export class VideoDemuxer {
  public demux(filePath: string): DemuxResult {
    const ext = filePath.split('.').pop()?.toUpperCase() ?? 'MP4';
    const container = (['MP4', 'AVI', 'MOV', 'MKV', 'WEBM'].includes(ext) ? ext : 'MP4') as SupportedVideoContainer;

    return {
      container,
      codec: 'H264',
      width: 1920,
      height: 1080,
      fps: 30,
      durationMs: 60000,
      totalFrames: 1800,
    };
  }
}
