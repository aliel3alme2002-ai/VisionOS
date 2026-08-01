export interface HeatmapProps {
  id: string;
  cameraId: string;
  timeRange: string;
  grid: number[][];
}

export class Heatmap {
  public readonly id: string;
  public readonly cameraId: string;
  public readonly timeRange: string;
  public readonly grid: number[][];

  constructor(props: HeatmapProps) {
    this.id = props.id;
    this.cameraId = props.cameraId;
    this.timeRange = props.timeRange;
    this.grid = props.grid;
  }
}
