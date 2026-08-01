export interface ExecutionRequestProps {
  modelId: string;
  version: string;
  runtime: string;
  input: Record<string, unknown>;
  batchSize: number;
  priority: number;
  timeout: number;
  organizationId: string;
}

export class ExecutionRequest implements ExecutionRequestProps {
  public readonly modelId: string;
  public readonly version: string;
  public readonly runtime: string;
  public readonly input: Record<string, unknown>;
  public readonly batchSize: number;
  public readonly priority: number;
  public readonly timeout: number;
  public readonly organizationId: string;

  constructor(props: ExecutionRequestProps) {
    this.modelId = props.modelId;
    this.version = props.version;
    this.runtime = props.runtime;
    this.input = props.input;
    this.batchSize = props.batchSize;
    this.priority = props.priority;
    this.timeout = props.timeout;
    this.organizationId = props.organizationId;
  }
}
