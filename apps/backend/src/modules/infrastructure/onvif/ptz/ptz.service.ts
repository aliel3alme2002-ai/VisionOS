import { Injectable } from '@nestjs/common';
import { PresetService } from './preset.service';
import { PtzCommand } from '../../../integration/models/ptz-command';

@Injectable()
export class PtzService {
  constructor(private readonly presetService: PresetService) {}

  async move(command: PtzCommand): Promise<void> {
    if (!command.cameraId) return;
  }

  async stop(cameraId: string): Promise<void> {
    if (!cameraId) return;
  }

  async gotoPreset(cameraId: string, presetId: string): Promise<void> {
    if (!cameraId || !presetId) return;
  }

  async listPresets(cameraId: string): Promise<string[]> {
    const presets = await this.presetService.getPresets(cameraId);
    return presets.map(p => p.name);
  }
}
