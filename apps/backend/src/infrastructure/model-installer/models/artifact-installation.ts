import { ArtifactState } from './artifact-state';

export interface ArtifactInstallationProps {
  installationId: string;
  artifactId: string;
  version: string;
  state: ArtifactState;
  bytesDownloaded: number;
  totalBytes: number;
  stagingPath: string;
  targetPath: string;
  errorMessage?: string | undefined;
  startedAt: Date;
  completedAt?: Date | undefined;
}

export class ArtifactInstallation implements ArtifactInstallationProps {
  public readonly installationId: string;
  public readonly artifactId: string;
  public readonly version: string;
  public state: ArtifactState;
  public bytesDownloaded: number;
  public readonly totalBytes: number;
  public readonly stagingPath: string;
  public readonly targetPath: string;
  public errorMessage?: string | undefined;
  public readonly startedAt: Date;
  public completedAt?: Date | undefined;

  constructor(props: ArtifactInstallationProps) {
    this.installationId = props.installationId;
    this.artifactId = props.artifactId;
    this.version = props.version;
    this.state = props.state;
    this.bytesDownloaded = props.bytesDownloaded;
    this.totalBytes = props.totalBytes;
    this.stagingPath = props.stagingPath;
    this.targetPath = props.targetPath;
    this.errorMessage = props.errorMessage;
    this.startedAt = props.startedAt;
    this.completedAt = props.completedAt;
  }
}
