import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';

@Injectable()
export class ChecksumService {
  public async calculateSHA256(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(filePath)) {
        return resolve('');
      }
      const hash = crypto.createHash('sha256');
      const stream = fs.createReadStream(filePath);

      stream.on('data', (data) => hash.update(data));
      stream.on('end', () => resolve(hash.digest('hex')));
      stream.on('error', (err) => reject(err));
    });
  }

  public async verifyChecksum(filePath: string, expectedSHA256: string): Promise<boolean> {
    const calculated = await this.calculateSHA256(filePath);
    if (!calculated) return false;
    return calculated.toLowerCase() === expectedSHA256.toLowerCase();
  }
}
