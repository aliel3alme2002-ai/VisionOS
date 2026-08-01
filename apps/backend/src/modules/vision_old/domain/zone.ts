import { ZoneType } from '../enums/zone-type';

export interface Point {
  x: number;
  y: number;
}

export interface Zone {
  id: string;
  cameraId: string;
  name: string;
  polygon: Point[];
  type: ZoneType;
}
