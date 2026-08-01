import { StreamProtocol } from '../enums/stream-protocol';
import { StreamQuality } from '../enums/stream-quality';

export interface Stream {
  id: string;
  cameraId: string;
  protocol: StreamProtocol;
  url: string;
  codec: string;
  resolution: string;
  fps: number;
  bitrate: number;
  quality: StreamQuality;
  enabled: boolean;
}
