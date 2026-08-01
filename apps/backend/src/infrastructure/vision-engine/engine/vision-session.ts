import { VisionState } from '../models/vision-state';

export interface VisionSessionProps {
  sessionId: string;
  cameraId: string;
  rtspUrl: string;
  modelId: string;
  state: VisionState;
  createdAt: Date;
}

export class VisionSession implements VisionSessionProps {
  public readonly sessionId: string;
  public readonly cameraId: string;
  public readonly rtspUrl: string;
  public readonly modelId: string;
  public state: VisionState;
  public readonly createdAt: Date;

  constructor(props: VisionSessionProps) {
    this.sessionId = props.sessionId;
    this.cameraId = props.cameraId;
    this.rtspUrl = props.rtspUrl;
    this.modelId = props.modelId;
    this.state = props.state;
    this.createdAt = props.createdAt;
  }
}
