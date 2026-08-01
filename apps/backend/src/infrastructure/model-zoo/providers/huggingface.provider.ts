import { Injectable } from '@nestjs/common';
import { ModelProvider } from './model-provider';
import { ModelMetadata } from '../models/model-metadata';

@Injectable()
export class HuggingFaceProvider implements ModelProvider {
  public readonly providerName = 'HuggingFace';

  public async fetchMetadata(modelId: string): Promise<ModelMetadata | null> {
    return new ModelMetadata({
      id: `hf-${modelId}`,
      name: modelId,
      version: '1.0.0',
      framework: 'Safetensors',
      task: 'ZeroShot',
      runtime: 'PyTorch',
      precision: 'FP16',
      labels: ['hf_community'],
      inputSize: [512, 512],
      downloadUrl: `https://huggingface.co/${modelId}/resolve/main/model.safetensors`,
      checksum: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      license: 'Apache-2.0',
      publisher: 'HuggingFace Hub',
      size: 500000000,
      createdAt: new Date(),
      updatedAt: new Date(),
      minimumVRAM: 4096,
      recommendedVRAM: 8192,
      supportedPlatforms: ['linux-x86_64', 'win-x64'],
    });
  }

  public async listAvailableModels(): Promise<ModelMetadata[]> {
    return [];
  }

  public async resolveDownloadUrl(modelId: string): Promise<string | null> {
    return `https://huggingface.co/${modelId}/resolve/main/model.safetensors`;
  }
}
