export interface CameraDiscoveryProvider {
  discoverCameras(subnet: string): Promise<any[]>;
}

export const CAMERA_DISCOVERY_PROVIDER = Symbol('CAMERA_DISCOVERY_PROVIDER');
