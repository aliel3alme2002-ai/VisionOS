import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class DirectoryManager {
  private readonly baseDir: string = path.join(process.cwd(), 'storage', 'artifacts');

  constructor() {
    this.ensureDir(this.getStagingDir());
    this.ensureDir(this.getActiveDir());
    this.ensureDir(this.getArchiveDir());
  }

  public getStagingDir(): string {
    return path.join(this.baseDir, 'staging');
  }

  public getActiveDir(): string {
    return path.join(this.baseDir, 'active');
  }

  public getArchiveDir(): string {
    return path.join(this.baseDir, 'archive');
  }

  public getArtifactStagingPath(artifactId: string, version: string): string {
    return path.join(this.getStagingDir(), `${artifactId}-${version}`);
  }

  public getArtifactActivePath(artifactId: string, version: string): string {
    return path.join(this.getActiveDir(), artifactId, version);
  }

  public ensureDir(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  public removeDir(dirPath: string): void {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
    }
  }
}
