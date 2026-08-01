export interface BenchmarkResultProps {
  modelId: string;
  fps: number;
  latencyMs: number;
  memoryUsageMb: number;
  gpuUsagePercent: number;
  cpuUsagePercent: number;
  inputResolution: number[];
  testedAt: Date;
  hardware: string;
}

export class BenchmarkResult implements BenchmarkResultProps {
  public readonly modelId: string;
  public readonly fps: number;
  public readonly latencyMs: number;
  public readonly memoryUsageMb: number;
  public readonly gpuUsagePercent: number;
  public readonly cpuUsagePercent: number;
  public readonly inputResolution: number[];
  public readonly testedAt: Date;
  public readonly hardware: string;

  constructor(props: BenchmarkResultProps) {
    this.modelId = props.modelId;
    this.fps = props.fps;
    this.latencyMs = props.latencyMs;
    this.memoryUsageMb = props.memoryUsageMb;
    this.gpuUsagePercent = props.gpuUsagePercent;
    this.cpuUsagePercent = props.cpuUsagePercent;
    this.inputResolution = props.inputResolution;
    this.testedAt = props.testedAt;
    this.hardware = props.hardware;
  }
}
