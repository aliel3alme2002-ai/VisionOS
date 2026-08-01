import { ModelFramework } from './model-framework';
import { ModelTask } from './model-task';
import { ModelRuntimeType } from './model-runtime';
import { ModelPrecision } from './model-precision';
import { ModelLicense } from './model-license';

export interface ModelMetadataProps {
  id: string;
  name: string;
  version: string;
  framework: ModelFramework;
  task: ModelTask;
  runtime: ModelRuntimeType;
  precision: ModelPrecision;
  labels: string[];
  inputSize: number[];
  downloadUrl: string;
  checksum: string;
  license: ModelLicense;
  publisher: string;
  size: number; // in bytes
  createdAt: Date;
  updatedAt: Date;
  minimumVRAM: number; // in MB
  recommendedVRAM: number; // in MB
  supportedPlatforms: string[];
}

export class ModelMetadata implements ModelMetadataProps {
  public readonly id: string;
  public readonly name: string;
  public readonly version: string;
  public readonly framework: ModelFramework;
  public readonly task: ModelTask;
  public readonly runtime: ModelRuntimeType;
  public readonly precision: ModelPrecision;
  public readonly labels: string[];
  public readonly inputSize: number[];
  public readonly downloadUrl: string;
  public readonly checksum: string;
  public readonly license: ModelLicense;
  public readonly publisher: string;
  public readonly size: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly minimumVRAM: number;
  public readonly recommendedVRAM: number;
  public readonly supportedPlatforms: string[];

  constructor(props: ModelMetadataProps) {
    this.id = props.id;
    this.name = props.name;
    this.version = props.version;
    this.framework = props.framework;
    this.task = props.task;
    this.runtime = props.runtime;
    this.precision = props.precision;
    this.labels = props.labels;
    this.inputSize = props.inputSize;
    this.downloadUrl = props.downloadUrl;
    this.checksum = props.checksum;
    this.license = props.license;
    this.publisher = props.publisher;
    this.size = props.size;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.minimumVRAM = props.minimumVRAM;
    this.recommendedVRAM = props.recommendedVRAM;
    this.supportedPlatforms = props.supportedPlatforms;
  }
}
