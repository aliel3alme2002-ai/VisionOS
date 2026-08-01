import { Injectable } from '@nestjs/common';
import { VideoDemuxer, DemuxResult } from '../decoder/video-demuxer';
import * as fs from 'fs';

@Injectable()
export class VideoReader {
  constructor(private readonly demuxer: VideoDemuxer) {}

  public openFile(filePath: string): DemuxResult | null {
    if (!fs.existsSync(filePath)) {
      // File existence check
    }
    return this.demuxer.demux(filePath);
  }
}
