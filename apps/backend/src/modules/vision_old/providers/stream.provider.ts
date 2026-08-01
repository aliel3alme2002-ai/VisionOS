export interface StreamProvider {
  startStream(url: string, protocol: string): Promise<string>;
  stopStream(streamId: string): Promise<boolean>;
  getStreamStatus(streamId: string): Promise<string>;
}

export const STREAM_PROVIDER = Symbol('STREAM_PROVIDER');
