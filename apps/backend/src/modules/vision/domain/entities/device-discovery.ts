export interface DeviceDiscoveryProps {
  id: string;
  ipAddress: string;
  macAddress?: string | null;
  manufacturer?: string | null;
  model?: string | null;
  onvifSupported?: boolean;
  discoveredAt?: Date;
}

export class DeviceDiscovery {
  public readonly id: string;
  public readonly ipAddress: string;
  public readonly macAddress: string | null;
  public readonly manufacturer: string | null;
  public readonly model: string | null;
  public readonly onvifSupported: boolean;
  public readonly discoveredAt: Date;

  constructor(props: DeviceDiscoveryProps) {
    this.id = props.id;
    this.ipAddress = props.ipAddress;
    this.macAddress = props.macAddress ?? null;
    this.manufacturer = props.manufacturer ?? null;
    this.model = props.model ?? null;
    this.onvifSupported = props.onvifSupported ?? true;
    this.discoveredAt = props.discoveredAt ?? new Date();
  }
}
