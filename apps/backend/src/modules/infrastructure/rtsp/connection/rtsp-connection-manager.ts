import { Injectable } from '@nestjs/common';
import { RtspConnectionState } from '../models/rtsp-state';
import { RtspConnection } from './rtsp-connection';

@Injectable()
export class RtspConnectionManager {
  private connections: Map<string, RtspConnection> = new Map();

  async connect(target: string): Promise<boolean> {
    const connection: RtspConnection = {
      target,
      state: 'CONNECTED',
      connectedAt: new Date(),
      lastPingAt: new Date()
    };
    this.connections.set(target, connection);
    return true;
  }

  async disconnect(target: string): Promise<void> {
    const conn = this.connections.get(target);
    if (conn) {
      conn.state = 'DISCONNECTED';
      this.connections.delete(target);
    }
  }

  async reconnect(target: string): Promise<boolean> {
    await this.disconnect(target);
    return this.connect(target);
  }

  getConnection(target: string): RtspConnection | undefined {
    return this.connections.get(target);
  }

  getState(target: string): RtspConnectionState {
    return this.connections.get(target)?.state || 'DISCONNECTED';
  }
}
