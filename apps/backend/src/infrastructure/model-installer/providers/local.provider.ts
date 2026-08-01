import { Injectable } from '@nestjs/common';
import { ArtifactProvider } from './artifact-provider';
import { ArtifactManifest } from '../models/artifact-manifest';
import { Artifact } from '../models/artifact';

@Injectable()
export class LocalArtifactProvider implements ArtifactProvider {
  public readonly name = 'Local';

  public async fetchManifest(artifactId: string, version: string): Promise<ArtifactManifest | null> {
    return new ArtifactManifest({
      id: artifactId,
      name: artifactId,
      version,
      format: '.onnx',
      sha256: 'local-file-checksum-placeholder',
      sizeBytes: 10000000,
      entryFile: `${artifactId}.onnx`,
      metadataJson: { provider: 'Local' },
    });
  }

  public async resolveDownloadUrl(artifactId: string, _version: string): Promise<string | null> {
    return `file:///models/${artifactId}.onnx`;
  }

  public async listArtifacts(): Promise<Artifact[]> {
    return [];
  }
}
