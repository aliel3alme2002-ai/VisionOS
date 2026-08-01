export interface StreamRequestProps {
  streamId: string;
  cameraId: string;
  rtspUrl: string;
  modelId: string;
  targetFps: number;
  batchSize: number;
  priority: number;
  organizationId: string;
}

export class StreamRequest implements StreamRequestProps {
  public readonly streamId: string;
  public readonly cameraId: string;
  public readonly rtspUrl: string;
  public readonly modelId: string;
  public readonly targetFps: number;
  public readonly batchSize: number;
  public readonly priority: number;
  public readonly organizationId: string;

  constructor(props: StreamRequestProps) {
    this.streamId = props.streamId;
    this.cameraId = props.cameraId;
    this.rtspUrl = props.rtspUrl;
    this.modelId = props.modelId;
    this.targetFps = props.targetFps;
    this.batchSize = props.batchSize;
    this.priority = props.priority;
    this.organizationId = props.organizationId;
  }
}
