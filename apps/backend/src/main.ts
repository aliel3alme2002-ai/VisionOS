import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyHelmet from '@fastify/helmet';
import fastifyCompress from '@fastify/compress';

import { AppModule } from './app.module';
import { VisionOSLogger } from './common/logging/visionos-logger.service';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { VISIONOS_CONFIG } from './config/config.constants';
import { VisionOSConfig } from '@visionos/config';

/**
 * ====================================================
 * BOOTSTRAP ORDER
 * ====================================================
 * 
 * 1. Load Config (via ConfigModule initialization)
 *    ↓
 * 2. Create Nest App (FastifyAdapter with buffered logs)
 *    ↓
 * 3. Register Security & Fastify Plugins (Helmet, CORS, Compression)
 *    ↓
 * 4. Register Logger & Global Exception Filters
 *    ↓
 * 5. Configure Global Prefix & URI Versioning (/api/v1)
 *    ↓
 * 6. Register Swagger Documentation (Development mode only at /docs)
 *    ↓
 * 7. Enable Graceful Shutdown Hooks (SIGINT, SIGTERM)
 *    ↓
 * 8. Start HTTP Server & Output Startup Banner
 * 
 * ====================================================
 */

async function bootstrap() {
  // Step 2: Create Nest App
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    }
  );

  // Step 1 & 4: Get Logger & Config
  const logger = app.get(VisionOSLogger);
  app.useLogger(logger);
  const config = app.get<VisionOSConfig>(VISIONOS_CONFIG);

  // Step 3: Register Security (Helmet, CORS, Compression)
  type FastifyPlugin = Parameters<NestFastifyApplication['register']>[0];

  await app.register(fastifyHelmet as unknown as FastifyPlugin, {
    contentSecurityPolicy: config.app.env === 'production' ? undefined : false,
  });

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  await app.register(fastifyCompress as unknown as FastifyPlugin, {
    encodings: ['gzip', 'deflate'],
  });

  // Step 4: Register Filters
  app.useGlobalFilters(new GlobalExceptionFilter(logger));

  // Step 5: Configure Global Prefix & URI Versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Step 6: Register Swagger (Development mode only)
  if (config.app.env !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('VisionOS API')
      .setDescription('VisionOS Backend API')
      .setVersion('v1')
      .addBearerAuth()
      .addTag('Health')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
  }

  // Step 7: Enable Graceful Shutdown
  app.enableShutdownHooks();

  // Step 8: Start Server
  const port = config.app.port || 3000;
  await app.listen(port, '0.0.0.0');

  // Print Banner
  console.log(`
------------------------------------
VisionOS Backend
Environment: ${config.app.env}
Port:        ${port}
Version:     v1.0.0
------------------------------------
`);
}

bootstrap();
