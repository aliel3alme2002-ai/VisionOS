import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ArtifactStorage {
  public fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  public getFileSize(filePath: string): number {
    if (!this.fileExists(filePath)) return 0;
    return fs.statSync(filePath).size;
  }

  public atomicMove(sourcePath: string, destPath: string): void {
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.renameSync(sourcePath, destPath);
  }
}
