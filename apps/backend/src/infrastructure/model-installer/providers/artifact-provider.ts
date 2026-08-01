import { Artifact } from '../models/artifact';
import { ArtifactManifest } from '../models/artifact-manifest';

export interface ArtifactProvider {
  readonly name: string;
  fetchManifest(artifactId: string, version: string): Promise<ArtifactManifest | null>;
  resolveDownloadUrl(artifactId: string, version: string): Promise<string | null>;
  listArtifacts(): Promise<Artifact[]>;
}
