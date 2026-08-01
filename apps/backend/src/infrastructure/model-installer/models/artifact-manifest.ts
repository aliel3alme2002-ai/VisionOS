export interface ArtifactManifestProps {
  id: string;
  name: string;
  version: string;
  format: string;
  sha256: string;
  signature?: string | undefined;
  sizeBytes: number;
  entryFile: string;
  metadataJson: Record<string, unknown>;
}

export class ArtifactManifest implements ArtifactManifestProps {
  public readonly id: string;
  public readonly name: string;
  public readonly version: string;
  public readonly format: string;
  public readonly sha256: string;
  public readonly signature?: string | undefined;
  public readonly sizeBytes: number;
  public readonly entryFile: string;
  public readonly metadataJson: Record<string, unknown>;

  constructor(props: ArtifactManifestProps) {
    this.id = props.id;
    this.name = props.name;
    this.version = props.version;
    this.format = props.format;
    this.sha256 = props.sha256;
    this.signature = props.signature;
    this.sizeBytes = props.sizeBytes;
    this.entryFile = props.entryFile;
    this.metadataJson = props.metadataJson;
  }
}
