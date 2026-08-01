import { DeploymentStatus } from '../value-objects/deployment-status';

export interface DeploymentProps {
  id: string;
  modelVersionId: string;
  runtimeId: string;
  deploymentSlotId: string;
  strategy?: string;
  status?: DeploymentStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Deployment {
  public readonly id: string;
  public readonly modelVersionId: string;
  public readonly runtimeId: string;
  public readonly deploymentSlotId: string;
  public readonly strategy: string;
  private _status: DeploymentStatus;
  public readonly createdAt: Date;
  private _updatedAt: Date;

  constructor(props: DeploymentProps) {
    this.id = props.id;
    this.modelVersionId = props.modelVersionId;
    this.runtimeId = props.runtimeId;
    this.deploymentSlotId = props.deploymentSlotId;
    this.strategy = props.strategy ?? 'Rolling';
    this._status = props.status ?? DeploymentStatus.active();
    this.createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  public get status(): DeploymentStatus { return this._status; }
  public get updatedAt(): Date { return this._updatedAt; }

  public rollback(): void {
    this._status = DeploymentStatus.rolledBack();
    this._updatedAt = new Date();
  }
}
