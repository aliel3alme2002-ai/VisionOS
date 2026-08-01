import { IsNotEmpty, IsString } from 'class-validator';

export class DiscoverDevicesDto {
  @IsString()
  @IsNotEmpty()
  subnet!: string;
}

export class SyncDeviceDto {
  @IsString()
  @IsNotEmpty()
  deviceId!: string;
}
