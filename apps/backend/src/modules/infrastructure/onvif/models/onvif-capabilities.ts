export interface Capability {
  id: string;
  name: string;
  category: 'PTZ' | 'Snapshot' | 'Recording' | 'Events' | 'Audio' | 'Metadata' | 'Analytics' | 'Network' | 'Security';
  version: string;
  enabled: boolean;
}

export interface OnvifCapabilities {
  deviceId: string;
  capabilities: Capability[];
}
