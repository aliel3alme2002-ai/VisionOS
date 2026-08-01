import { Injectable } from '@nestjs/common';
import { ModelMetadata } from '../models/model-metadata';
import { ChecksumService } from '../download/checksum.service';
import { ModelStorageService } from '../storage/model-storage.service';
import { MetadataValidationService } from './metadata.service';
import { CompatibilityService, SystemCapabilities } from '../versioning/compatibility.service';

export interface ValidationReport {
  isValid: boolean;
  fileExists: boolean;
  checksumValid: boolean;
  metadataValid: boolean;
  compatible: boolean;
  errors: string[];
}

@Injectable()
export class ModelValidator {
  constructor(
    private readonly checksumService: ChecksumService,
    private readonly storageService: ModelStorageService,
    private readonly metadataValidator: MetadataValidationService,
    private readonly compatibilityService: CompatibilityService,
  ) {}

  public async validateModel(
    metadata: ModelMetadata,
    filePath: string,
    systemCapabilities?: SystemCapabilities,
  ): Promise<ValidationReport> {
    const errors: string[] = [];

    // 1. Metadata Validation
    const metaCheck = this.metadataValidator.validate(metadata);
    if (!metaCheck.valid) {
      errors.push(...metaCheck.errors);
    }

    // 2. File Exists Check
    const fileExists = this.storageService.fileExists(filePath);
    if (!fileExists) {
      errors.push(`Model file not found at path: ${filePath}`);
    }

    // 3. SHA256 Checksum Validation
    let checksumValid = false;
    if (fileExists) {
      checksumValid = await this.checksumService.verifyChecksum(filePath, metadata.checksum);
      if (!checksumValid) {
        errors.push(`SHA256 checksum mismatch for ${metadata.id}`);
      }
    }

    // 4. Compatibility Validation
    let compatible = true;
    if (systemCapabilities) {
      const compatCheck = this.compatibilityService.checkCompatibility(metadata, systemCapabilities);
      compatible = compatCheck.compatible;
      if (!compatible && compatCheck.reason) {
        errors.push(compatCheck.reason);
      }
    }

    const isValid = errors.length === 0;

    return {
      isValid,
      fileExists,
      checksumValid,
      metadataValid: metaCheck.valid,
      compatible,
      errors,
    };
  }
}
