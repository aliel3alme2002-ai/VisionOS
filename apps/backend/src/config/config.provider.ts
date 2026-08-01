import { Provider } from '@nestjs/common';
import { loadConfig, VisionOSConfig } from '@visionos/config';
import { VISIONOS_CONFIG } from './config.constants';

export const configProvider: Provider = {
  provide: VISIONOS_CONFIG,
  useFactory: (): VisionOSConfig => {
    return loadConfig();
  },
};
