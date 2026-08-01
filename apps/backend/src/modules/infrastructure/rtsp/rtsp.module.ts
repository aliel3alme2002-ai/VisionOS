import { Module } from '@nestjs/common';
import { RtspAdapter } from './adapter/rtsp.adapter';
import { RtspConnectionManager } from './connection/rtsp-connection-manager';
import { RtspSessionManager } from './session/rtsp-session-manager';
import { RtspHealthService } from './health/rtsp-health.service';
import { RtspReconnectService } from './reconnect/rtsp-reconnect.service';

@Module({
  providers: [
    RtspAdapter,
    RtspConnectionManager,
    RtspSessionManager,
    RtspHealthService,
    RtspReconnectService
  ],
  exports: [
    RtspAdapter,
    RtspConnectionManager,
    RtspSessionManager,
    RtspHealthService
  ]
})
export class RtspModule {}
