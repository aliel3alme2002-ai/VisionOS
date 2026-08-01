export type DeviceState = 
  | 'UNKNOWN' 
  | 'DISCOVERED' 
  | 'CONNECTING' 
  | 'CONNECTED' 
  | 'AUTH_FAILED' 
  | 'DISCONNECTED' 
  | 'UNREACHABLE';

export interface OnvifDevice {
  id: string;
  ipAddress: string;
  macAddress: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  firmwareVersion: string;
  state: DeviceState;
  lastSeen: Date;
}
