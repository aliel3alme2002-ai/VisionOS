import { StreamState } from './stream-state';

export interface StreamResultProps {
  streamId: string;
  cameraId: string;
  processedFrames: number;
  droppedFrames: number;
  currentFps: number;
  averageLatencyMs: number;
  lastFrameTimestamp: number;
  status: StreamState;
  errorMessage?: string | undefined;
}

export class StreamResult implements StreamResultProps {
  public readonly streamId: string;
  public readonly cameraId: string;
  public readonly processedFrames: number;
  public readonly droppedFrames: number;
  public readonly currentFps: number;
  public readonly averageLatencyMs: number;
  public readonly lastFrameTimestamp: number;
  public readonly status: StreamState;
  public readonly errorMessage?: string | undefined;

  constructor(props: StreamResultProps) {
    this.streamId = props.streamId;
    this.cameraId = props.cameraId;
    this.processedFrames = props.processedFrames;
    this.droppedFrames = props.droppedFrames;
    this.currentFps = props.currentFps;
    this.averageLatencyMs = props.averageLatencyMs;
    this.lastFrameTimestamp = props.lastFrameTimestamp;
    this.status = props.status;
    this.errorMessage = props.errorMessage;
  }
}
