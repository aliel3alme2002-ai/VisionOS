import { Module, Global } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionManager } from './transactions/transaction-manager';
import { UnitOfWork } from './transactions/unit-of-work';

import { PrismaOrganizationRepository } from './repositories/organization/prisma-organization.repository';
import { PrismaUserRepository } from './repositories/user/prisma-user.repository';

import { PrismaRoleRepository } from './repositories/access/prisma-role.repository';
import { PrismaPermissionRepository } from './repositories/access/prisma-permission.repository';
import { PrismaPermissionGroupRepository } from './repositories/access/prisma-permission-group.repository';
import { PrismaRoleAssignmentRepository } from './repositories/access/prisma-role-assignment.repository';

import { PrismaCameraRepository } from './repositories/vision/prisma-camera.repository';
import { PrismaCameraGroupRepository } from './repositories/vision/prisma-camera-group.repository';
import { PrismaStreamProfileRepository } from './repositories/vision/prisma-stream-profile.repository';
import { PrismaEdgeNodeRepository } from './repositories/vision/prisma-edge-node.repository';

import { PrismaAiModelRepository } from './repositories/ai/prisma-ai-model.repository';
import { PrismaDeploymentRepository } from './repositories/ai/prisma-deployment.repository';
import { PrismaPipelineRepository } from './repositories/ai/prisma-pipeline.repository';
import { PrismaRuntimeRepository } from './repositories/ai/prisma-runtime.repository';

import { PrismaDetectionRepository } from './repositories/intelligence/prisma-detection.repository';
import { PrismaTrackedObjectRepository } from './repositories/intelligence/prisma-tracked-object.repository';
import { PrismaRuleRepository } from './repositories/intelligence/prisma-rule.repository';
import { PrismaZoneRepository } from './repositories/intelligence/prisma-zone.repository';
import { PrismaEventRepository } from './repositories/intelligence/prisma-event.repository';

const Repositories = [
  PrismaOrganizationRepository,
  PrismaUserRepository,
  PrismaRoleRepository,
  PrismaPermissionRepository,
  PrismaPermissionGroupRepository,
  PrismaRoleAssignmentRepository,
  PrismaCameraRepository,
  PrismaCameraGroupRepository,
  PrismaStreamProfileRepository,
  PrismaEdgeNodeRepository,
  PrismaAiModelRepository,
  PrismaDeploymentRepository,
  PrismaPipelineRepository,
  PrismaRuntimeRepository,
  PrismaDetectionRepository,
  PrismaTrackedObjectRepository,
  PrismaRuleRepository,
  PrismaZoneRepository,
  PrismaEventRepository,
];

@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    TransactionManager,
    UnitOfWork,
    ...Repositories,
    { provide: 'IOrganizationRepository', useClass: PrismaOrganizationRepository },
    { provide: 'IUserRepository', useClass: PrismaUserRepository },
    { provide: 'IRoleRepository', useClass: PrismaRoleRepository },
    { provide: 'IPermissionRepository', useClass: PrismaPermissionRepository },
    { provide: 'IPermissionGroupRepository', useClass: PrismaPermissionGroupRepository },
    { provide: 'IRoleAssignmentRepository', useClass: PrismaRoleAssignmentRepository },
    { provide: 'ICameraRepository', useClass: PrismaCameraRepository },
    { provide: 'ICameraGroupRepository', useClass: PrismaCameraGroupRepository },
    { provide: 'IStreamProfileRepository', useClass: PrismaStreamProfileRepository },
    { provide: 'IEdgeNodeRepository', useClass: PrismaEdgeNodeRepository },
    { provide: 'IAiModelRepository', useClass: PrismaAiModelRepository },
    { provide: 'IDeploymentRepository', useClass: PrismaDeploymentRepository },
    { provide: 'IPipelineRepository', useClass: PrismaPipelineRepository },
    { provide: 'IRuntimeRepository', useClass: PrismaRuntimeRepository },
    { provide: 'IDetectionRepository', useClass: PrismaDetectionRepository },
    { provide: 'ITrackedObjectRepository', useClass: PrismaTrackedObjectRepository },
    { provide: 'IRuleRepository', useClass: PrismaRuleRepository },
    { provide: 'IZoneRepository', useClass: PrismaZoneRepository },
    { provide: 'IEventRepository', useClass: PrismaEventRepository },
  ],
  exports: [
    PrismaModule,
    TransactionManager,
    UnitOfWork,
    'IOrganizationRepository',
    'IUserRepository',
    'IRoleRepository',
    'IPermissionRepository',
    'IPermissionGroupRepository',
    'IRoleAssignmentRepository',
    'ICameraRepository',
    'ICameraGroupRepository',
    'IStreamProfileRepository',
    'IEdgeNodeRepository',
    'IAiModelRepository',
    'IDeploymentRepository',
    'IPipelineRepository',
    'IRuntimeRepository',
    'IDetectionRepository',
    'ITrackedObjectRepository',
    'IRuleRepository',
    'IZoneRepository',
    'IEventRepository',
  ],
})
export class DatabaseModule {}
