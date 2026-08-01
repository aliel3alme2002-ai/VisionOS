import { Injectable } from '@nestjs/common';
import { ArtifactManifest } from '../models/artifact-manifest';

@Injectable()
export class ManifestValidator {
  public validate(manifest: ArtifactManifest): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!manifest.id) errors.push('Manifest missing ID');
    if (!manifest.version) errors.push('Manifest missing Version');
    if (!manifest.sha256) errors.push('Manifest missing SHA256');
    if (!manifest.entryFile) errors.push('Manifest missing Entry File');

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
