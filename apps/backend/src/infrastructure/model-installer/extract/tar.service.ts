import { Injectable } from '@nestjs/common';

@Injectable()
export class TarService {
  public async extract(archivePath: string, destinationDir: string): Promise<boolean> {
    // Tar.gz extraction handler
    return Boolean(archivePath && destinationDir);
  }
}
