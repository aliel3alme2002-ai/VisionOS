import { PipelineStage } from './pipeline-stage';

export interface PipelineProps {
  id: string;
  organizationId: string;
  name: string;
  description?: string | null;
  runtimeId: string;
  stages?: PipelineStage[];
}

export class Pipeline {
  public readonly id: string;
  public readonly organizationId: string;
  private _name: string;
  private _description: string | null;
  public readonly runtimeId: string;
  private _stages: PipelineStage[];

  constructor(props: PipelineProps) {
    this.id = props.id;
    this.organizationId = props.organizationId;
    this._name = props.name;
    this._description = props.description ?? null;
    this.runtimeId = props.runtimeId;
    this._stages = props.stages ?? [];
  }

  public get name(): string { return this._name; }
  public get description(): string | null { return this._description; }
  public get stages(): readonly PipelineStage[] { return [...this._stages]; }

  public addStage(stage: PipelineStage): void {
    this._stages.push(stage);
  }
}
