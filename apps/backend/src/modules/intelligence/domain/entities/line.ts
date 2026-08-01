import { Point } from './zone';

export interface LineProps {
  id: string;
  cameraId: string;
  name: string;
  start: Point;
  end: Point;
  direction?: string;
}

export class Line {
  public readonly id: string;
  public readonly cameraId: string;
  public readonly name: string;
  public readonly start: Point;
  public readonly end: Point;
  public readonly direction: string;

  constructor(props: LineProps) {
    this.id = props.id;
    this.cameraId = props.cameraId;
    this.name = props.name;
    this.start = props.start;
    this.end = props.end;
    this.direction = props.direction ?? 'BOTH';
  }
}
