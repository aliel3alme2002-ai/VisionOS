import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('VisionOS REST API')
    .setDescription('VisionOS Hybrid Edge-Cloud AI Vision Intelligence Platform API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT bearer token',
        in: 'header',
      },
      'bearer-auth',
    )
    .addTag('Health', 'Health and Liveness endpoints')
    .addTag('Auth', 'Authentication and Session endpoints')
    .addTag('Organization', 'Organization and Hierarchy management')
    .addTag('Users', 'User management')
    .addTag('RBAC', 'Role-Based Access Control')
    .addTag('Vision', 'Cameras, Streams, Zones, Edge Nodes')
    .addTag('Detection', 'AI Model Detections and Inference')
    .addTag('Rules', 'Business Rules Engine')
    .addTag('Workflow', 'Workflow Automation Engine')
    .addTag('Notification', 'Notification Engine')
    .addTag('Recording', 'Video Recording Engine')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  return document;
}
