export interface FrameProps {
  frameId: string;
  timestamp: number; // PTS in ms
  width: number;
  height: number;
  pixelFormat: 'RGB24' | 'BGR24' | 'YUV420P' | 'NV12';
  sourceId: string;
  index: number;
  buffer: Uint8Array;
  metadata?: Record<string, unknown> | undefined;
}

export class Frame implements FrameProps {
  public readonly frameId: string;
  public readonly timestamp: number;
  public readonly width: number;
  public readonly height: number;
  public readonly pixelFormat: 'RGB24' | 'BGR24' | 'YUV420P' | 'NV12';
  public readonly sourceId: string;
  public readonly index: number;
  public readonly buffer: Uint8Array;
  public readonly metadata?: Record<string, unknown> | undefined;

  constructor(props: FrameProps) {
    this.frameId = props.frameId;
    this.timestamp = props.timestamp;
    this.width = props.width;
    this.height = props.height;
    this.pixelFormat = props.pixelFormat;
    this.sourceId = props.sourceId;
    this.index = props.index;
    this.buffer = props.buffer;
    this.metadata = props.metadata;
  }
}
