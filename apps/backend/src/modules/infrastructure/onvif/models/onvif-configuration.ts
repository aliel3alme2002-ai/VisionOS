export interface OnvifConfiguration {
  deviceId: string;
  name: string;
  dateTime: Date;
  networkSettings: Record<string, unknown>;
}
