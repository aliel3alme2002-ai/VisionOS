import { Injectable } from '@nestjs/common';
import { ArtifactProvider } from './artifact-provider';
import { ArtifactManifest } from '../models/artifact-manifest';
import { Artifact } from '../models/artifact';

@Injectable()
export class GitHubArtifactProvider implements ArtifactProvider {
  public readonly name = 'GitHub';

  public async fetchManifest(artifactId: string, version: string): Promise<ArtifactManifest | null> {
    return new ArtifactManifest({
      id: artifactId,
      name: artifactId,
      version,
      format: '.onnx',
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      sizeBytes: 50000000,
      entryFile: `${artifactId}.onnx`,
      metadataJson: { provider: 'GitHub' },
    });
  }

  public async resolveDownloadUrl(artifactId: string, version: string): Promise<string | null> {
    return `https://github.com/releases/download/${version}/${artifactId}.onnx`;
  }

  public async listArtifacts(): Promise<Artifact[]> {
    return [];
  }
}
