export type PlaybackState = 'PLAYING' | 'PAUSED' | 'STOPPED' | 'SEEKING';

export interface VideoSessionProps {
  sessionId: string;
  sourcePath: string;
  state: PlaybackState;
  currentPtsMs: number;
  playbackSpeed: number;
  loop: boolean;
  targetFps: number;
}

export class VideoSession implements VideoSessionProps {
  public readonly sessionId: string;
  public readonly sourcePath: string;
  public state: PlaybackState;
  public currentPtsMs: number;
  public playbackSpeed: number;
  public loop: boolean;
  public targetFps: number;

  constructor(props: VideoSessionProps) {
    this.sessionId = props.sessionId;
    this.sourcePath = props.sourcePath;
    this.state = props.state;
    this.currentPtsMs = props.currentPtsMs;
    this.playbackSpeed = props.playbackSpeed;
    this.loop = props.loop;
    this.targetFps = props.targetFps;
  }
}
