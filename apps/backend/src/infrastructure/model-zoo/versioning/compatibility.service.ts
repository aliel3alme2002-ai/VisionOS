import { Injectable } from '@nestjs/common';
import { ModelMetadata } from '../models/model-metadata';

export interface SystemCapabilities {
  platform: string;
  availableVRAM: number; // in MB
  supportedRuntimes: string[];
}

@Injectable()
export class CompatibilityService {
  public checkCompatibility(metadata: ModelMetadata, system: SystemCapabilities): { compatible: boolean; reason?: string } {
    if (!metadata.supportedPlatforms.includes(system.platform)) {
      return { compatible: false, reason: `Platform ${system.platform} is not in supported platforms: ${metadata.supportedPlatforms.join(', ')}` };
    }

    if (system.availableVRAM < metadata.minimumVRAM) {
      return { compatible: false, reason: `Required minimum VRAM ${metadata.minimumVRAM}MB exceeds available VRAM ${system.availableVRAM}MB` };
    }

    if (!system.supportedRuntimes.includes(metadata.runtime)) {
      return { compatible: false, reason: `Required runtime ${metadata.runtime} is not supported by host system` };
    }

    return { compatible: true };
  }
}
