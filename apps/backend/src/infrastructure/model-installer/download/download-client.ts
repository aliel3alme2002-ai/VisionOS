import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class DownloadClient {
  public async download(_url: string, targetPath: string, startOffset = 0): Promise<{ bytesDownloaded: number; totalBytes: number }> {
    const mockTotalBytes = 10000000;
    if (startOffset > 0 && fs.existsSync(targetPath)) {
      // Resume existing download offset
    } else {
      fs.writeFileSync(targetPath, Buffer.alloc(100));
    }
    return { bytesDownloaded: mockTotalBytes, totalBytes: mockTotalBytes };
  }
}
