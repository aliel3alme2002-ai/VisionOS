import { StreamState } from '../models/stream-state';

export interface LiveStreamSessionProps {
  sessionId: string;
  streamId: string;
  cameraId: string;
  rtspUrl: string;
  state: StreamState;
  createdAt: Date;
}

export class LiveStreamSession implements LiveStreamSessionProps {
  public readonly sessionId: string;
  public readonly streamId: string;
  public readonly cameraId: string;
  public readonly rtspUrl: string;
  public state: StreamState;
  public readonly createdAt: Date;

  constructor(props: LiveStreamSessionProps) {
    this.sessionId = props.sessionId;
    this.streamId = props.streamId;
    this.cameraId = props.cameraId;
    this.rtspUrl = props.rtspUrl;
    this.state = props.state;
    this.createdAt = props.createdAt;
  }
}
