import { PixelFormat } from '../decoder/pixel-format';

export interface FfmpegConfigProps {
  rtspTransport: 'tcp' | 'udp';
  lowLatency: boolean;
  hwAccel?: 'cuda' | 'vaapi' | 'qsv' | 'none' | undefined;
  pixelFormat: PixelFormat;
  width: number;
  height: number;
  fps: number;
  timeoutMs: number;
  reconnect: boolean;
  isWebcam?: boolean | undefined;
  webcamDeviceName?: string | undefined;
}

export class FfmpegConfig implements FfmpegConfigProps {
  public readonly rtspTransport: 'tcp' | 'udp';
  public readonly lowLatency: boolean;
  public readonly hwAccel?: 'cuda' | 'vaapi' | 'qsv' | 'none' | undefined;
  public readonly pixelFormat: PixelFormat;
  public readonly width: number;
  public readonly height: number;
  public readonly fps: number;
  public readonly timeoutMs: number;
  public readonly reconnect: boolean;
  public readonly isWebcam?: boolean | undefined;
  public readonly webcamDeviceName?: string | undefined;

  constructor(props?: Partial<FfmpegConfigProps>) {
    this.rtspTransport = props?.rtspTransport ?? 'tcp';
    this.lowLatency = props?.lowLatency ?? true;
    this.hwAccel = props?.hwAccel ?? 'none';
    this.pixelFormat = props?.pixelFormat ?? 'rgb24';
    this.width = props?.width ?? 1920;
    this.height = props?.height ?? 1080;
    this.fps = props?.fps ?? 30;
    this.timeoutMs = props?.timeoutMs ?? 5000;
    this.reconnect = props?.reconnect ?? true;
    this.isWebcam = props?.isWebcam ?? false;
    this.webcamDeviceName = props?.webcamDeviceName;
  }

  public buildCliArgs(inputUrlOrDevice: string): string[] {
    const args: string[] = [];

    // DirectShow / Webcam Input Handling
    if (this.isWebcam) {
      const isWin = process.platform === 'win32';
      const isMac = process.platform === 'darwin';

      if (isWin) {
        args.push('-f', 'dshow');
        const device = this.webcamDeviceName ?? 'video=Integrated Camera';
        const formattedDevice = device.startsWith('video=') ? device : `video=${device}`;
        args.push('-i', formattedDevice);
      } else if (isMac) {
        args.push('-f', 'avfoundation');
        args.push('-i', this.webcamDeviceName ?? '0');
      } else {
        args.push('-f', 'v4l2');
        args.push('-i', this.webcamDeviceName ?? '/dev/video0');
      }
    } else {
      // RTSP / Network Stream Input
      if (this.hwAccel && this.hwAccel !== 'none') {
        args.push('-hwaccel', this.hwAccel);
      }

      args.push('-rtsp_transport', this.rtspTransport);
      if (this.reconnect) {
        args.push('-reconnect', '1', '-reconnect_at_eof', '1', '-reconnect_streamed', '1');
      }

      if (this.lowLatency) {
        args.push('-fflags', 'nobuffer', '-flags', 'low_delay');
      }

      args.push('-timeout', (this.timeoutMs * 1000).toString());
      args.push('-i', inputUrlOrDevice);
    }

    // Output Raw Frame Parameters
    args.push('-f', 'rawvideo', '-pix_fmt', this.pixelFormat, '-r', this.fps.toString(), 'pipe:1');

    return args;
  }
}
