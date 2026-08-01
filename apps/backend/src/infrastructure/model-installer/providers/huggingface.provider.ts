import { Injectable } from '@nestjs/common';
import { ArtifactProvider } from './artifact-provider';
import { ArtifactManifest } from '../models/artifact-manifest';
import { Artifact } from '../models/artifact';

@Injectable()
export class HuggingFaceArtifactProvider implements ArtifactProvider {
  public readonly name = 'HuggingFace';

  public async fetchManifest(artifactId: string, version: string): Promise<ArtifactManifest | null> {
    return new ArtifactManifest({
      id: artifactId,
      name: artifactId,
      version,
      format: '.safetensors',
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      sizeBytes: 500000000,
      entryFile: 'model.safetensors',
      metadataJson: { provider: 'HuggingFace' },
    });
  }

  public async resolveDownloadUrl(artifactId: string, version: string): Promise<string | null> {
    return `https://huggingface.co/${artifactId}/resolve/${version}/model.safetensors`;
  }

  public async listArtifacts(): Promise<Artifact[]> {
    return [];
  }
}
