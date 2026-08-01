import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ModelStorageService {
  private readonly baseStorageDir: string = path.join(process.cwd(), 'storage', 'models');

  constructor() {
    if (!fs.existsSync(this.baseStorageDir)) {
      fs.mkdirSync(this.baseStorageDir, { recursive: true });
    }
  }

  public getModelDir(modelId: string): string {
    const dir = path.join(this.baseStorageDir, modelId);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return dir;
  }

  public getModelFilePath(modelId: string, filename: string): string {
    return path.join(this.getModelDir(modelId), filename);
  }

  public fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  public getDirectorySize(dirPath: string): number {
    if (!fs.existsSync(dirPath)) return 0;
    let totalSize = 0;
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);
      if (stat.isFile()) {
        totalSize += stat.size;
      }
    }
    return totalSize;
  }
}
