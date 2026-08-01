export interface BoundingBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class BoundingBox {
  public readonly x: number;
  public readonly y: number;
  public readonly width: number;
  public readonly height: number;

  constructor(props: BoundingBoxProps) {
    this.x = props.x;
    this.y = props.y;
    this.width = props.width;
    this.height = props.height;
  }
}
