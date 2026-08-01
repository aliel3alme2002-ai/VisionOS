export interface ModelArtifactProps {
  id: string;
  storageObjectId: string;
  size: number;
  format: string;
  checksum: string;
}

export class ModelArtifact {
  public readonly id: string;
  public readonly storageObjectId: string;
  public readonly size: number;
  public readonly format: string;
  public readonly checksum: string;

  constructor(props: ModelArtifactProps) {
    this.id = props.id;
    this.storageObjectId = props.storageObjectId;
    this.size = props.size;
    this.format = props.format;
    this.checksum = props.checksum;
  }
}
