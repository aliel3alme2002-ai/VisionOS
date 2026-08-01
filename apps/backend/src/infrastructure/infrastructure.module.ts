import { Module, Global } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseHealthService } from './health/database-health.service';

// Auth Repositories
import { SESSION_REPOSITORY } from '../modules/auth/repositories/session.repository';
import { PrismaSessionRepository } from './repositories/auth/prisma-session.repository';
import { USER_REPOSITORY as AUTH_USER_REPOSITORY } from '../modules/auth/repositories/user.repository';
import { AuthPrismaUserRepository } from './repositories/auth/prisma-user.repository';

// RBAC Repositories
import { PERMISSION_REPOSITORY } from '../modules/rbac/repositories/permission.repository';
import { PrismaPermissionRepository } from './repositories/rbac/prisma-permission.repository';
import { ROLE_REPOSITORY } from '../modules/rbac/repositories/role.repository';
import { PrismaRoleRepository } from './repositories/rbac/prisma-role.repository';
import { USER_ROLE_REPOSITORY } from '../modules/rbac/repositories/user-role.repository';
import { PrismaUserRoleRepository } from './repositories/rbac/prisma-user-role.repository';

// Organization Repositories
import { ORGANIZATION_REPOSITORY } from '../modules/organization/repositories/organization.repository';
import { PrismaOrganizationRepository } from './repositories/organization/prisma-organization.repository';
import { HOTEL_REPOSITORY } from '../modules/organization/repositories/hotel.repository';
import { PrismaHotelRepository } from './repositories/organization/prisma-hotel.repository';
import { DEPARTMENT_REPOSITORY } from '../modules/organization/repositories/department.repository';
import { PrismaDepartmentRepository } from './repositories/organization/prisma-department.repository';
import { MEMBERSHIP_REPOSITORY } from '../modules/organization/repositories/membership.repository';
import { PrismaMembershipRepository } from './repositories/organization/prisma-membership.repository';
import { HIERARCHY_REPOSITORY } from '../modules/organization/repositories/hierarchy.repository';
import { PrismaHierarchyRepository } from './repositories/organization/prisma-hierarchy.repository';

// Users Repositories
import { USER_REPOSITORY } from '../modules/users/repositories/user.repository';
import { PrismaUserRepository } from './repositories/users/prisma-user.repository';
import { INVITATION_REPOSITORY } from '../modules/users/repositories/invitation.repository';
import { PrismaInvitationRepository } from './repositories/users/prisma-invitation.repository';
import { USER_PROFILE_REPOSITORY } from '../modules/users/repositories/user-profile.repository';
import { PrismaUserProfileRepository } from './repositories/users/prisma-user-profile.repository';

import { RedisModule } from './redis/redis.module';
import { TransactionModule } from './transactions/transaction.module';

import { ModelZooModule } from './model-zoo/model-zoo.module';
import { RuntimeModule } from './runtime/runtime.module';
import { ModelInstallerModule } from './model-installer/model-installer.module';
import { RuntimeIntegrationModule } from './runtime-integration/runtime-integration.module';
import { RuntimeExecutionModule } from './runtime-execution/runtime-execution.module';
import { VideoModule } from './video/video.module';
import { LiveStreamModule } from './live-stream/live-stream.module';
import { FfmpegModule } from './ffmpeg/ffmpeg.module';
import { TrackingModule } from './tracking/tracking.module';
import { VisionEngineModule } from './vision-engine/vision-engine.module';
import { DetectionRulesModule } from './detection-rules/detection-rules.module';

@Global()
@Module({
  imports: [PrismaModule, RedisModule, TransactionModule, DatabaseModule, ModelZooModule, RuntimeModule, ModelInstallerModule, RuntimeIntegrationModule, RuntimeExecutionModule, VideoModule, LiveStreamModule, FfmpegModule, TrackingModule, VisionEngineModule, DetectionRulesModule],
  providers: [
    DatabaseHealthService,
    { provide: SESSION_REPOSITORY, useClass: PrismaSessionRepository },
    { provide: AUTH_USER_REPOSITORY, useClass: AuthPrismaUserRepository },
    
    { provide: PERMISSION_REPOSITORY, useClass: PrismaPermissionRepository },
    { provide: ROLE_REPOSITORY, useClass: PrismaRoleRepository },
    { provide: USER_ROLE_REPOSITORY, useClass: PrismaUserRoleRepository },
    
    { provide: ORGANIZATION_REPOSITORY, useClass: PrismaOrganizationRepository },
    { provide: HOTEL_REPOSITORY, useClass: PrismaHotelRepository },
    { provide: DEPARTMENT_REPOSITORY, useClass: PrismaDepartmentRepository },
    { provide: MEMBERSHIP_REPOSITORY, useClass: PrismaMembershipRepository },
    { provide: HIERARCHY_REPOSITORY, useClass: PrismaHierarchyRepository },
    
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
    { provide: INVITATION_REPOSITORY, useClass: PrismaInvitationRepository },
    { provide: USER_PROFILE_REPOSITORY, useClass: PrismaUserProfileRepository },
  ],
  exports: [
    PrismaModule,
    RedisModule,
    TransactionModule,
    DatabaseModule,
    ModelZooModule,
    RuntimeModule,
    ModelInstallerModule,
    RuntimeIntegrationModule,
    RuntimeExecutionModule,
    VideoModule,
    LiveStreamModule,
    FfmpegModule,
    TrackingModule,
    VisionEngineModule,
    DetectionRulesModule,
    DatabaseHealthService,
    SESSION_REPOSITORY,
    AUTH_USER_REPOSITORY,
    PERMISSION_REPOSITORY,
    ROLE_REPOSITORY,
    USER_ROLE_REPOSITORY,
    ORGANIZATION_REPOSITORY,
    HOTEL_REPOSITORY,
    DEPARTMENT_REPOSITORY,
    MEMBERSHIP_REPOSITORY,
    HIERARCHY_REPOSITORY,
    USER_REPOSITORY,
    INVITATION_REPOSITORY,
    USER_PROFILE_REPOSITORY,
  ],
})
export class InfrastructureModule {}
