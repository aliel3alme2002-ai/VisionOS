export interface FrigateCamera {
  name: string;
  enabled: boolean;
  fps: number;
  height: number;
  width: number;
  detect: {
    enabled: boolean;
    maxDisappeared?: number;
  };
}
