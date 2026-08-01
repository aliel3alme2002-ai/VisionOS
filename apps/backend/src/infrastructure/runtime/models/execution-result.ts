export interface ExecutionResultProps {
  success: boolean;
  latency: number;
  fps: number;
  memoryUsage: number;
  gpuUsage: number;
  outputs: Record<string, unknown>;
  error?: string | undefined;
}

export class ExecutionResult implements ExecutionResultProps {
  public readonly success: boolean;
  public readonly latency: number;
  public readonly fps: number;
  public readonly memoryUsage: number;
  public readonly gpuUsage: number;
  public readonly outputs: Record<string, unknown>;
  public readonly error?: string | undefined;

  constructor(props: ExecutionResultProps) {
    this.success = props.success;
    this.latency = props.latency;
    this.fps = props.fps;
    this.memoryUsage = props.memoryUsage;
    this.gpuUsage = props.gpuUsage;
    this.outputs = props.outputs;
    this.error = props.error;
  }
}
