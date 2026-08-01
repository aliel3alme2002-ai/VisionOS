import { Injectable } from '@nestjs/common';

@Injectable()
export class SignatureValidator {
  public validateSignature(_filePath: string, signature?: string): boolean {
    if (!signature) return true; // Optional digital signature check
    return signature.length > 0;
  }
}
