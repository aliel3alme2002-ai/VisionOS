export type SupportedArtifactFormat = '.zip' | '.tar.gz' | '.onnx' | '.pt' | '.engine' | '.xml' | '.bin' | '.safetensors';

export interface ArtifactProps {
  id: string;
  name: string;
  version: string;
  format: SupportedArtifactFormat;
  downloadUrl: string;
  sha256: string;
  sizeBytes: number;
  installedPath?: string | undefined;
  createdAt: Date;
}

export class Artifact implements ArtifactProps {
  public readonly id: string;
  public readonly name: string;
  public readonly version: string;
  public readonly format: SupportedArtifactFormat;
  public readonly downloadUrl: string;
  public readonly sha256: string;
  public readonly sizeBytes: number;
  public installedPath?: string | undefined;
  public readonly createdAt: Date;

  constructor(props: ArtifactProps) {
    this.id = props.id;
    this.name = props.name;
    this.version = props.version;
    this.format = props.format;
    this.downloadUrl = props.downloadUrl;
    this.sha256 = props.sha256;
    this.sizeBytes = props.sizeBytes;
    this.installedPath = props.installedPath;
    this.createdAt = props.createdAt;
  }
}
