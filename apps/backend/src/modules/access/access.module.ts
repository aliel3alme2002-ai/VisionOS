import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RolesController } from './controllers/roles.controller';
import { PermissionsController } from './controllers/permissions.controller';
import { AuthorizationController } from './controllers/authorization.controller';

import { CreateRoleHandler } from './application/commands/create-role/create-role.handler';
import { UpdateRoleHandler } from './application/commands/update-role/update-role.handler';
import { DeleteRoleHandler } from './application/commands/delete-role/delete-role.handler';
import { RestoreRoleHandler } from './application/commands/restore-role/restore-role.handler';
import { AssignRoleHandler } from './application/commands/assign-role/assign-role.handler';
import { RemoveRoleHandler } from './application/commands/remove-role/remove-role.handler';

import { CreatePermissionHandler } from './application/commands/create-permission/create-permission.handler';
import { UpdatePermissionHandler } from './application/commands/update-permission/update-permission.handler';
import { DeletePermissionHandler } from './application/commands/delete-permission/delete-permission.handler';
import { CreatePermissionGroupHandler } from './application/commands/create-permission-group/create-permission-group.handler';
import { AssignPermissionGroupHandler } from './application/commands/assign-permission-group/assign-permission-group.handler';

import { GetRoleHandler } from './application/queries/get-role/get-role.handler';
import { ListRolesHandler } from './application/queries/list-roles/list-roles.handler';
import { GetPermissionHandler } from './application/queries/get-permission/get-permission.handler';
import { ListPermissionsHandler } from './application/queries/list-permissions/list-permissions.handler';
import { EvaluateAccessHandler } from './application/queries/evaluate-access/evaluate-access.handler';

import { AccessEvaluationService } from './domain/services/access-evaluation.service';
import { AccessPolicyService } from './domain/services/access-policy.service';
import {
  InMemoryRoleRepository,
  InMemoryPermissionRepository,
  InMemoryPermissionGroupRepository,
  InMemoryRoleAssignmentRepository,
} from './domain/repositories/in-memory-access.repository';

const CommandHandlers = [
  CreateRoleHandler,
  UpdateRoleHandler,
  DeleteRoleHandler,
  RestoreRoleHandler,
  AssignRoleHandler,
  RemoveRoleHandler,
  CreatePermissionHandler,
  UpdatePermissionHandler,
  DeletePermissionHandler,
  CreatePermissionGroupHandler,
  AssignPermissionGroupHandler,
];

const QueryHandlers = [
  GetRoleHandler,
  ListRolesHandler,
  GetPermissionHandler,
  ListPermissionsHandler,
  EvaluateAccessHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [RolesController, PermissionsController, AuthorizationController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    AccessEvaluationService,
    AccessPolicyService,
    InMemoryRoleRepository,
    InMemoryPermissionRepository,
    InMemoryPermissionGroupRepository,
    InMemoryRoleAssignmentRepository,
    { provide: 'IRoleRepository', useClass: InMemoryRoleRepository },
    { provide: 'IPermissionRepository', useClass: InMemoryPermissionRepository },
    { provide: 'IPermissionGroupRepository', useClass: InMemoryPermissionGroupRepository },
    { provide: 'IRoleAssignmentRepository', useClass: InMemoryRoleAssignmentRepository },
  ],
  exports: [
    AccessEvaluationService,
    AccessPolicyService,
    'IRoleRepository',
    'IPermissionRepository',
    'IRoleAssignmentRepository',
  ],
})
export class AccessModule {}
