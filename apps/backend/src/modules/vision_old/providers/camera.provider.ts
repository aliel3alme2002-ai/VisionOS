export interface CameraProvider {
  connect(ipAddress: string, credentials: any): Promise<boolean>;
  disconnect(ipAddress: string): Promise<boolean>;
  getCapabilities(ipAddress: string): Promise<any>;
  reboot(ipAddress: string): Promise<boolean>;
}

export const CAMERA_PROVIDER = Symbol('CAMERA_PROVIDER');
