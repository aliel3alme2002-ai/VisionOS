export interface StreamQualityProps {
  codec: string;
  resolution: string;
  fps: number;
  bitrate: number;
  transport: string;
}

export class StreamQuality {
  public readonly codec: string;
  public readonly resolution: string;
  public readonly fps: number;
  public readonly bitrate: number;
  public readonly transport: string;

  constructor(props?: Partial<StreamQualityProps>) {
    this.codec = props?.codec ?? 'H.264';
    this.resolution = props?.resolution ?? '1080p';
    this.fps = props?.fps ?? 30;
    this.bitrate = props?.bitrate ?? 4000;
    this.transport = props?.transport ?? 'RTSP';
  }
}
