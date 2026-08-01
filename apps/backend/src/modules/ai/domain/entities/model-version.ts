export interface ModelVersionProps {
  id: string;
  modelId: string;
  version: string;
  checksum: string;
  artifactId: string;
  createdAt?: Date;
}

export class ModelVersion {
  public readonly id: string;
  public readonly modelId: string;
  public readonly version: string;
  public readonly checksum: string;
  public readonly artifactId: string;
  public readonly createdAt: Date;

  constructor(props: ModelVersionProps) {
    this.id = props.id;
    this.modelId = props.modelId;
    this.version = props.version;
    this.checksum = props.checksum;
    this.artifactId = props.artifactId;
    this.createdAt = props.createdAt ?? new Date();
  }
}
