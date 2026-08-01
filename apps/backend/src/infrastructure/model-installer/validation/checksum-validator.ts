import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';

@Injectable()
export class ChecksumValidator {
  public async validateSHA256(filePath: string, expectedSHA256: string): Promise<boolean> {
    if (!fs.existsSync(filePath)) return false;
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);

    return new Promise((resolve) => {
      stream.on('data', (chunk) => hash.update(chunk));
      stream.on('end', () => {
        const calculated = hash.digest('hex');
        resolve(calculated.toLowerCase() === expectedSHA256.toLowerCase());
      });
      stream.on('error', () => resolve(false));
    });
  }
}
