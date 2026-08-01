export interface PacketStream {
  streamId: string;
  codec: string;
  width: number;
  height: number;
  fps: number;
}

export class VideoStream implements PacketStream {
  public readonly streamId: string;
  public readonly codec: string;
  public readonly width: number;
  public readonly height: number;
  public readonly fps: number;

  constructor(props: PacketStream) {
    this.streamId = props.streamId;
    this.codec = props.codec;
    this.width = props.width;
    this.height = props.height;
    this.fps = props.fps;
  }
}
