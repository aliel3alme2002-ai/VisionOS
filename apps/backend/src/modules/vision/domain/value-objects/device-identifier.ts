export class DeviceIdentifier {
  constructor(
    public readonly uuid: string,
    public readonly serialNumber?: string | null,
    public readonly macAddress?: string | null,
  ) {}

  public equals(other: DeviceIdentifier): boolean {
    if (this.uuid === other.uuid) return true;
    if (this.serialNumber && other.serialNumber && this.serialNumber === other.serialNumber) return true;
    if (this.macAddress && other.macAddress && this.macAddress.toLowerCase() === other.macAddress.toLowerCase()) return true;
    return false;
  }
}
