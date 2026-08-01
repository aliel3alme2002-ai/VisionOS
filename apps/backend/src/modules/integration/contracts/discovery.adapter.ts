import { CameraDiscovery } from '../models/camera-discovery';

export interface DiscoveryAdapter {
  discover(networkCidr?: string): Promise<CameraDiscovery[]>;
}
