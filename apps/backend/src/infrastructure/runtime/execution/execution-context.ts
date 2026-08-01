export interface ExecutionContextProps {
  requestId: string;
  modelId: string;
  batchSize: number;
  allocatedMemoryMb: number;
  deviceTarget: string;
}

export class ExecutionContext implements ExecutionContextProps {
  public readonly requestId: string;
  public readonly modelId: string;
  public readonly batchSize: number;
  public readonly allocatedMemoryMb: number;
  public readonly deviceTarget: string;

  constructor(props: ExecutionContextProps) {
    this.requestId = props.requestId;
    this.modelId = props.modelId;
    this.batchSize = props.batchSize;
    this.allocatedMemoryMb = props.allocatedMemoryMb;
    this.deviceTarget = props.deviceTarget;
  }
}
