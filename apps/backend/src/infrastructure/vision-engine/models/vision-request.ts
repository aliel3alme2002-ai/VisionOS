export interface VisionRequestProps {
  sessionId: string;
  cameraId: string;
  rtspUrl: string;
  modelId: string;
  targetFps: number;
  batchSize: number;
  enableTracking: boolean;
  organizationId: string;
}

export class VisionRequest implements VisionRequestProps {
  public readonly sessionId: string;
  public readonly cameraId: string;
  public readonly rtspUrl: string;
  public readonly modelId: string;
  public readonly targetFps: number;
  public readonly batchSize: number;
  public readonly enableTracking: boolean;
  public readonly organizationId: string;

  constructor(props: VisionRequestProps) {
    this.sessionId = props.sessionId;
    this.cameraId = props.cameraId;
    this.rtspUrl = props.rtspUrl;
    this.modelId = props.modelId;
    this.targetFps = props.targetFps;
    this.batchSize = props.batchSize;
    this.enableTracking = props.enableTracking;
    this.organizationId = props.organizationId;
  }
}
