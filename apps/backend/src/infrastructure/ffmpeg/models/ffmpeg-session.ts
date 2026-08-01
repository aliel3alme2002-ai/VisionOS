import { FfmpegState } from './ffmpeg-state';

export interface FfmpegSessionProps {
  sessionId: string;
  streamId: string;
  rtspUrl: string;
  pid?: number | undefined;
  state: FfmpegState;
  startedAt: Date;
  reconnectCount: number;
}

export class FfmpegSession implements FfmpegSessionProps {
  public readonly sessionId: string;
  public readonly streamId: string;
  public readonly rtspUrl: string;
  public pid?: number | undefined;
  public state: FfmpegState;
  public readonly startedAt: Date;
  public reconnectCount: number;

  constructor(props: FfmpegSessionProps) {
    this.sessionId = props.sessionId;
    this.streamId = props.streamId;
    this.rtspUrl = props.rtspUrl;
    this.pid = props.pid;
    this.state = props.state;
    this.startedAt = props.startedAt;
    this.reconnectCount = props.reconnectCount;
  }
}
