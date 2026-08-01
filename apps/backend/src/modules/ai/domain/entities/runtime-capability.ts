export interface RuntimeCapabilityProps {
  supportedFrameworks?: string[];
  maxBatchSize?: number;
  gpuSupported?: boolean;
}

export class RuntimeCapability {
  public readonly supportedFrameworks: string[];
  public readonly maxBatchSize: number;
  public readonly gpuSupported: boolean;

  constructor(props?: RuntimeCapabilityProps) {
    this.supportedFrameworks = props?.supportedFrameworks ?? ['TensorRT', 'ONNX', 'OpenVINO', 'PyTorch'];
    this.maxBatchSize = props?.maxBatchSize ?? 32;
    this.gpuSupported = props?.gpuSupported ?? true;
  }
}
