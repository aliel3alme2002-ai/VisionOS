import { Injectable } from '@nestjs/common';
import { ModelProvider } from './model-provider';
import { ModelMetadata } from '../models/model-metadata';

@Injectable()
export class LocalProvider implements ModelProvider {
  public readonly providerName = 'Local';

  public async fetchMetadata(modelId: string): Promise<ModelMetadata | null> {
    return new ModelMetadata({
      id: `local-${modelId}`,
      name: modelId,
      version: '1.0.0',
      framework: 'ONNX',
      task: 'Detection',
      runtime: 'ONNXRuntime',
      precision: 'FP32',
      labels: ['custom_local'],
      inputSize: [640, 640],
      downloadUrl: `file:///models/${modelId}.onnx`,
      checksum: 'local-file-checksum-placeholder',
      license: 'Custom',
      publisher: 'Local Storage',
      size: 10000000,
      createdAt: new Date(),
      updatedAt: new Date(),
      minimumVRAM: 512,
      recommendedVRAM: 1024,
      supportedPlatforms: ['linux-x86_64', 'linux-aarch64', 'win-x64'],
    });
  }

  public async listAvailableModels(): Promise<ModelMetadata[]> {
    return [];
  }

  public async resolveDownloadUrl(modelId: string): Promise<string | null> {
    return `file:///models/${modelId}.onnx`;
  }
}
