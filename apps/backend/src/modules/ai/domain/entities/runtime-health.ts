export interface RuntimeHealthProps {
  status: string;
  latencyMs?: number;
  memoryUtilization?: number;
  gpuUtilization?: number;
  lastHeartbeat?: Date;
}

export class RuntimeHealth {
  public readonly status: string;
  public readonly latencyMs: number;
  public readonly memoryUtilization: number;
  public readonly gpuUtilization: number;
  public readonly lastHeartbeat: Date;

  constructor(props: RuntimeHealthProps) {
    this.status = props.status;
    this.latencyMs = props.latencyMs ?? 5;
    this.memoryUtilization = props.memoryUtilization ?? 25;
    this.gpuUtilization = props.gpuUtilization ?? 15;
    this.lastHeartbeat = props.lastHeartbeat ?? new Date();
  }
}
