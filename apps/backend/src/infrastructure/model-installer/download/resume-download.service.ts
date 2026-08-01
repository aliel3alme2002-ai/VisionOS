import { Injectable } from '@nestjs/common';
import { ArtifactStorage } from '../filesystem/artifact-storage';

@Injectable()
export class ResumeDownloadService {
  constructor(private readonly storage: ArtifactStorage) {}

  public getResumeOffset(targetPath: string): number {
    if (!this.storage.fileExists(targetPath)) {
      return 0;
    }
    return this.storage.getFileSize(targetPath);
  }
}
