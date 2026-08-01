import { StreamState } from '../models/stream-state';

export interface StreamHealthProps {
  streamId: string;
  cameraId: string;
  state: StreamState;
  connected: boolean;
  queueDepth: number;
  droppedFrames: number;
  currentFps: number;
  averageLatencyMs: number;
  reconnectAttempts: number;
  timestamp: Date;
}

export class StreamHealth implements StreamHealthProps {
  public readonly streamId: string;
  public readonly cameraId: string;
  public readonly state: StreamState;
  public readonly connected: boolean;
  public readonly queueDepth: number;
  public readonly droppedFrames: number;
  public readonly currentFps: number;
  public readonly averageLatencyMs: number;
  public readonly reconnectAttempts: number;
  public readonly timestamp: Date;

  constructor(props: StreamHealthProps) {
    this.streamId = props.streamId;
    this.cameraId = props.cameraId;
    this.state = props.state;
    this.connected = props.connected;
    this.queueDepth = props.queueDepth;
    this.droppedFrames = props.droppedFrames;
    this.currentFps = props.currentFps;
    this.averageLatencyMs = props.averageLatencyMs;
    this.reconnectAttempts = props.reconnectAttempts;
    this.timestamp = props.timestamp;
  }
}
