export interface EdgeCapabilityProps {
  gpu?: string | null;
  cpu?: string | null;
  tpu?: string | null;
  storageGb?: number;
  memoryMb?: number;
}

export class EdgeCapability {
  public readonly gpu: string | null;
  public readonly cpu: string | null;
  public readonly tpu: string | null;
  public readonly storageGb: number;
  public readonly memoryMb: number;

  constructor(props?: EdgeCapabilityProps) {
    this.gpu = props?.gpu ?? null;
    this.cpu = props?.cpu ?? null;
    this.tpu = props?.tpu ?? null;
    this.storageGb = props?.storageGb ?? 256;
    this.memoryMb = props?.memoryMb ?? 8192;
  }
}
