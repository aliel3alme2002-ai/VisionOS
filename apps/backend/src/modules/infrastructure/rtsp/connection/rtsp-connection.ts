import { RtspConnectionState } from '../models/rtsp-state';

export interface RtspConnection {
  target: string;
  state: RtspConnectionState;
  connectedAt?: Date;
  lastPingAt?: Date;
}
