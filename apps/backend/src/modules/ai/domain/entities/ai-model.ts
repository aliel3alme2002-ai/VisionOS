import { ModelStatus } from '../value-objects/model-status';
import { ModelVersion } from './model-version';

export interface AiModelProps {
  id: string;
  organizationId: string;
  name: string;
  description?: string | null;
  framework: string;
  task: string;
  inputShape: string;
  outputShape: string;
  defaultVersion?: string | null;
  metadata?: Record<string, unknown>;
  status?: ModelStatus;
  versions?: ModelVersion[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class AiModel {
  public readonly id: string;
  public readonly organizationId: string;
  private _name: string;
  private _description: string | null;
  public readonly framework: string;
  public readonly task: string;
  public readonly inputShape: string;
  public readonly outputShape: string;
  private _defaultVersion: string | null;
  private _metadata: Record<string, unknown>;
  private _status: ModelStatus;
  private _versions: ModelVersion[];
  public readonly createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  constructor(props: AiModelProps) {
    this.id = props.id;
    this.organizationId = props.organizationId;
    this._name = props.name;
    this._description = props.description ?? null;
    this.framework = props.framework;
    this.task = props.task;
    this.inputShape = props.inputShape;
    this.outputShape = props.outputShape;
    this._defaultVersion = props.defaultVersion ?? null;
    this._metadata = props.metadata ?? {};
    this._status = props.status ?? ModelStatus.ready();
    this._versions = props.versions ?? [];
    this.createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._deletedAt = props.deletedAt ?? null;
  }

  public get name(): string { return this._name; }
  public get description(): string | null { return this._description; }
  public get defaultVersion(): string | null { return this._defaultVersion; }
  public get metadata(): Record<string, unknown> { return { ...this._metadata }; }
  public get status(): ModelStatus { return this._status; }
  public get versions(): readonly ModelVersion[] { return [...this._versions]; }
  public get updatedAt(): Date { return this._updatedAt; }
  public get deletedAt(): Date | null { return this._deletedAt; }

  public addVersion(version: ModelVersion): void {
    if (this._versions.some((v) => v.version === version.version)) {
      throw new Error(`Version ${version.version} already exists for model ${this.name}`);
    }
    this._versions.push(version);
    if (!this._defaultVersion) {
      this._defaultVersion = version.version;
    }
    this._updatedAt = new Date();
  }

  public update(name?: string, description?: string | null): void {
    if (name) this._name = name;
    if (description !== undefined) this._description = description;
    this._updatedAt = new Date();
  }
}
