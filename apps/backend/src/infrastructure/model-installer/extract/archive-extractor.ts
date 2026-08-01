import { Injectable } from '@nestjs/common';
import { ZipService } from './zip.service';
import { TarService } from './tar.service';

@Injectable()
export class ArchiveExtractor {
  constructor(
    private readonly zipService: ZipService,
    private readonly tarService: TarService,
  ) {}

  public async extract(filePath: string, destinationDir: string): Promise<boolean> {
    if (filePath.endsWith('.zip')) {
      return this.zipService.extract(filePath, destinationDir);
    }
    if (filePath.endsWith('.tar.gz') || filePath.endsWith('.tgz')) {
      return this.tarService.extract(filePath, destinationDir);
    }
    // Single binary format pass-through (.onnx, .pt, .engine, .xml, .bin, .safetensors)
    return true;
  }
}
