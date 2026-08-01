import { RuntimeState } from '../models/runtime-state';

export interface RuntimeSessionProps {
  sessionId: string;
  modelId: string;
  version: string;
  runtime: string;
  state: RuntimeState;
  allocatedVRAMMb: number;
  createdAt: Date;
}

export class RuntimeSession implements RuntimeSessionProps {
  public readonly sessionId: string;
  public readonly modelId: string;
  public readonly version: string;
  public readonly runtime: string;
  public state: RuntimeState;
  public allocatedVRAMMb: number;
  public readonly createdAt: Date;

  constructor(props: RuntimeSessionProps) {
    this.sessionId = props.sessionId;
    this.modelId = props.modelId;
    this.version = props.version;
    this.runtime = props.runtime;
    this.state = props.state;
    this.allocatedVRAMMb = props.allocatedVRAMMb;
    this.createdAt = props.createdAt;
  }
}
