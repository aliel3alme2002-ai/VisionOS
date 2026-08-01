import { ChildProcess, spawn } from 'child_process';
import { FfmpegConfig } from '../configuration/ffmpeg-config';
import { FfmpegException } from '../exceptions/ffmpeg.exception';

// Dynamic resolution for ffmpeg-static binary
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffmpegStaticPath: string | null = ((): string | null => {
  try {
    return require('ffmpeg-static') as string;
  } catch {
    return null;
  }
})();

export class FfmpegProcess {
  private process: ChildProcess | null = null;
  private isAlive = false;

  constructor(
    public readonly streamId: string,
    public readonly rtspUrl: string,
    public readonly config: FfmpegConfig,
  ) {}

  public spawnProcess(onFrameChunk: (chunk: Uint8Array) => void, onError: (err: Error) => void): number {
    const args = this.config.buildCliArgs(this.rtspUrl);
    const ffmpegCmd = ffmpegStaticPath ?? 'ffmpeg';

    try {
      this.process = spawn(ffmpegCmd, args, {
        windowsHide: true,
        stdio: ['ignore', 'pipe', 'pipe'],
      });

      this.isAlive = true;

      this.process.stdout?.on('data', (data: Buffer) => {
        onFrameChunk(new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
      });

      this.process.stderr?.on('data', (_data: Buffer) => {
        // Diagnostic stderr output parsing
      });

      this.process.on('error', (err: Error) => {
        this.isAlive = false;
        onError(new FfmpegException(`FFmpeg process failed: ${err.message}`));
      });

      this.process.on('exit', (code: number | null) => {
        this.isAlive = false;
        if (code !== 0 && code !== null) {
          onError(new FfmpegException(`FFmpeg process exited with code ${code}`));
        }
      });

      return this.process.pid ?? 0;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.isAlive = false;
      throw new FfmpegException(`Failed to spawn FFmpeg process: ${msg}`);
    }
  }

  public kill(): void {
    if (this.process && this.isAlive) {
      this.process.kill('SIGKILL');
      this.isAlive = false;
      this.process = null;
    }
  }

  public getIsAlive(): boolean {
    return this.isAlive;
  }
}
