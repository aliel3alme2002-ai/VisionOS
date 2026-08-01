import { ZoneType } from '../value-objects/zone-type';

export interface Point {
  x: number;
  y: number;
}

export interface ZoneProps {
  id: string;
  organizationId: string;
  cameraId: string;
  name: string;
  polygon: Point[];
  type?: ZoneType;
}

export class Zone {
  public readonly id: string;
  public readonly organizationId: string;
  public readonly cameraId: string;
  private _name: string;
  public readonly polygon: Point[];
  public readonly type: ZoneType;

  constructor(props: ZoneProps) {
    this.id = props.id;
    this.organizationId = props.organizationId;
    this.cameraId = props.cameraId;
    this._name = props.name;
    this.polygon = props.polygon;
    this.type = props.type ?? ZoneType.detection();
  }

  public get name(): string { return this._name; }

  public containsPoint(p: Point): boolean {
    if (this.polygon.length === 0) return false;
    let inside = false;
    for (let i = 0, j = this.polygon.length - 1; i < this.polygon.length; j = i++) {
      const pi = this.polygon[i];
      const pj = this.polygon[j];
      if (!pi || !pj) continue;
      const xi = pi.x, yi = pi.y;
      const xj = pj.x, yj = pj.y;
      const intersect = ((yi > p.y) !== (yj > p.y)) && (p.x < (xj - xi) * (p.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }
}
