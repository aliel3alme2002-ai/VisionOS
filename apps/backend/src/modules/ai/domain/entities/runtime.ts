import { RuntimeStatus } from '../value-objects/runtime-status';
import { RuntimeHealth } from './runtime-health';
import { RuntimeCapability } from './runtime-capability';
import { GpuDevice } from './gpu-device';

export interface RuntimeProps {
  id: string;
  edgeNodeId: string;
  type: string;
  version: string;
  status?: RuntimeStatus;
  health?: RuntimeHealth;
  capabilities?: RuntimeCapability;
  gpuDevices?: GpuDevice[];
}

export class Runtime {
  public readonly id: string;
  public readonly edgeNodeId: string;
  public readonly type: string;
  public readonly version: string;
  private _status: RuntimeStatus;
  private _health: RuntimeHealth;
  public readonly capabilities: RuntimeCapability;
  public readonly gpuDevices: GpuDevice[];

  constructor(props: RuntimeProps) {
    this.id = props.id;
    this.edgeNodeId = props.edgeNodeId;
    this.type = props.type;
    this.version = props.version;
    this._status = props.status ?? RuntimeStatus.online();
    this._health = props.health ?? new RuntimeHealth({ status: 'HEALTHY' });
    this.capabilities = props.capabilities ?? new RuntimeCapability();
    this.gpuDevices = props.gpuDevices ?? [];
  }

  public get status(): RuntimeStatus { return this._status; }
  public get health(): RuntimeHealth { return this._health; }
}
