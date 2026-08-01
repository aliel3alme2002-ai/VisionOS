import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VISIONOS_CONFIG } from '../config/config.constants';
import { VisionOSConfig } from '@visionos/config';

export interface HealthResponse {
  readonly status: string;
  readonly version: string;
  readonly environment: string;
  readonly uptime: number;
  readonly timestamp: string;
}

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    @Inject(VISIONOS_CONFIG) private readonly config: VisionOSConfig,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Check health status of backend' })
  @ApiResponse({ status: 200, description: 'Backend is healthy' })
  getHealth(): HealthResponse {
    return {
      status: 'healthy',
      version: '1.0.0',
      environment: this.config.app.env,
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}
