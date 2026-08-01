import { Injectable } from '@nestjs/common';
import { ModelProvider } from './model-provider';
import { ModelMetadata } from '../models/model-metadata';

@Injectable()
export class GitHubProvider implements ModelProvider {
  public readonly providerName = 'GitHub';

  public async fetchMetadata(modelId: string): Promise<ModelMetadata | null> {
    return new ModelMetadata({
      id: `gh-${modelId}`,
      name: modelId,
      version: '1.0.0',
      framework: 'ONNX',
      task: 'Detection',
      runtime: 'ONNXRuntime',
      precision: 'FP32',
      labels: ['github_release'],
      inputSize: [640, 640],
      downloadUrl: `https://github.com/releases/download/${modelId}.onnx`,
      checksum: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      license: 'MIT',
      publisher: 'GitHub Community',
      size: 50000000,
      createdAt: new Date(),
      updatedAt: new Date(),
      minimumVRAM: 1024,
      recommendedVRAM: 2048,
      supportedPlatforms: ['linux-x86_64', 'win-x64'],
    });
  }

  public async listAvailableModels(): Promise<ModelMetadata[]> {
    return [];
  }

  public async resolveDownloadUrl(modelId: string): Promise<string | null> {
    return `https://github.com/releases/download/${modelId}.onnx`;
  }
}
