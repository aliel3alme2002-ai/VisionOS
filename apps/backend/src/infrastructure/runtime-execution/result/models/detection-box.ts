export interface DetectionBoxProps {
  xNormalized: number;
  yNormalized: number;
  widthNormalized: number;
  heightNormalized: number;
  xPixel: number;
  yPixel: number;
  widthPixel: number;
  heightPixel: number;
  x1Pixel: number;
  y1Pixel: number;
  x2Pixel: number;
  y2Pixel: number;
}

export class DetectionBox implements DetectionBoxProps {
  public readonly xNormalized: number;
  public readonly yNormalized: number;
  public readonly widthNormalized: number;
  public readonly heightNormalized: number;
  public readonly xPixel: number;
  public readonly yPixel: number;
  public readonly widthPixel: number;
  public readonly heightPixel: number;
  public readonly x1Pixel: number;
  public readonly y1Pixel: number;
  public readonly x2Pixel: number;
  public readonly y2Pixel: number;

  constructor(props: DetectionBoxProps) {
    this.xNormalized = props.xNormalized;
    this.yNormalized = props.yNormalized;
    this.widthNormalized = props.widthNormalized;
    this.heightNormalized = props.heightNormalized;
    this.xPixel = props.xPixel;
    this.yPixel = props.yPixel;
    this.widthPixel = props.widthPixel;
    this.heightPixel = props.heightPixel;
    this.x1Pixel = props.x1Pixel;
    this.y1Pixel = props.y1Pixel;
    this.x2Pixel = props.x2Pixel;
    this.y2Pixel = props.y2Pixel;
  }
}
