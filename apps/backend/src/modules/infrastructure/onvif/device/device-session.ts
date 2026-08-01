import { OnvifDevice } from '../models/onvif-device';
import { OnvifCapabilities } from '../models/onvif-capabilities';
import { OnvifProfile } from '../models/onvif-profile';

export interface DeviceSession {
  id: string;
  deviceId: string;
  device: OnvifDevice;
  profiles: OnvifProfile[];
  capabilities: OnvifCapabilities;
  connectionState: string;
  lastSeen: Date;
}
