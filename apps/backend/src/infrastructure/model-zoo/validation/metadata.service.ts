import { Injectable } from '@nestjs/common';
import { ModelMetadata } from '../models/model-metadata';

@Injectable()
export class MetadataValidationService {
  public validate(metadata: ModelMetadata): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!metadata.id || metadata.id.trim() === '') errors.push('Model ID is required');
    if (!metadata.name || metadata.name.trim() === '') errors.push('Model Name is required');
    if (!metadata.version || metadata.version.trim() === '') errors.push('Model Version is required');
    if (!metadata.checksum || metadata.checksum.trim() === '') errors.push('SHA256 Checksum is required');
    if (metadata.size <= 0) errors.push('Model size must be greater than zero');
    if (metadata.minimumVRAM < 0) errors.push('Minimum VRAM cannot be negative');

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
