import { Injectable } from '@nestjs/common';
import { OnvifPreset } from '../models/onvif-preset';

@Injectable()
export class PresetService {
  async getPresets(deviceId: string): Promise<OnvifPreset[]> {
    if (!deviceId) return [];
    return [{ token: 'preset_1', name: 'Home Position', profileToken: 'profile_1' }];
  }
}
