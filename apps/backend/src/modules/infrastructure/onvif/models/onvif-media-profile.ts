export interface OnvifMediaProfile {
  profileToken: string;
  name: string;
  encoding: string;
  width: number;
  height: number;
  fps: number;
  rtspUri: string;
}
