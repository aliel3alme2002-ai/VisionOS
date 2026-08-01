export interface OnvifNetwork {
  dhcp: boolean;
  ipAddress: string;
  subnetMask: string;
  gateway: string;
  dns: string[];
}
