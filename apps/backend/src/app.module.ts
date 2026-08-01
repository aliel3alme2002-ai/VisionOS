import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { RBACModule } from './modules/rbac/rbac.module';
import { OrganizationModule } from './modules/organizations/organization.module';
import { UsersModule } from './modules/users/users.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { RequestContextMiddleware } from './common/middleware/request-context.middleware';

import { ApiModule } from './modules/api/api.module';

import { AccessModule } from './modules/access/access.module';

import { VisionModule } from './modules/vision/vision.module';
import { AiModule } from './modules/ai/ai.module';
import { IntelligenceModule } from './modules/intelligence/intelligence.module';

@Module({
  imports: [
    CoreModule, 
    HealthModule, 
    InfrastructureModule,
    ApiModule,
    AuthModule, 
    RBACModule,
    AccessModule, 
    OrganizationModule, 
    UsersModule,
    VisionModule,
    AiModule,
    IntelligenceModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
