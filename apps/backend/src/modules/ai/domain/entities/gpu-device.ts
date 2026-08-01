export interface GpuDeviceProps {
  id: string;
  vendor: string;
  name: string;
  memoryMb: number;
  computeCapability?: string;
  temperature?: number;
  utilization?: number;
}

export class GpuDevice {
  public readonly id: string;
  public readonly vendor: string;
  public readonly name: string;
  public readonly memoryMb: number;
  public readonly computeCapability: string;
  public readonly temperature: number;
  public readonly utilization: number;

  constructor(props: GpuDeviceProps) {
    this.id = props.id;
    this.vendor = props.vendor;
    this.name = props.name;
    this.memoryMb = props.memoryMb;
    this.computeCapability = props.computeCapability ?? '8.6';
    this.temperature = props.temperature ?? 45;
    this.utilization = props.utilization ?? 0;
  }
}
