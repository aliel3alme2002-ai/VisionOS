import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UsersController } from './controllers/users.controller';

import { CreateUserHandler } from './application/commands/create-user/create-user.handler';
import { UpdateUserHandler } from './application/commands/update-user/update-user.handler';
import { DisableUserHandler } from './application/commands/disable-user/disable-user.handler';
import { EnableUserHandler } from './application/commands/enable-user/enable-user.handler';
import { DeleteUserHandler } from './application/commands/delete-user/delete-user.handler';
import { RestoreUserHandler } from './application/commands/restore-user/restore-user.handler';
import { InviteUserHandler } from './application/commands/invite-user/invite-user.handler';
import { AcceptInvitationHandler } from './application/commands/accept-invitation/accept-invitation.handler';
import { ForcePasswordResetHandler } from './application/commands/force-password-reset/force-password-reset.handler';
import { UpdateProfileHandler } from './application/commands/update-profile/update-profile.handler';
import { UpdatePreferencesHandler } from './application/commands/update-preferences/update-preferences.handler';
import { UploadAvatarHandler } from './application/commands/upload-avatar/upload-avatar.handler';

import { GetUserHandler } from './application/queries/get-user/get-user.handler';
import { ListUsersHandler } from './application/queries/list-users/list-users.handler';
import { GetProfileHandler } from './application/queries/get-profile/get-profile.handler';
import { GetSessionsHandler } from './application/queries/get-sessions/get-sessions.handler';

import { UserPolicyService } from './domain/services/user-policy.service';
import { InMemoryUserRepository } from './domain/repositories/in-memory-user.repository';

const CommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DisableUserHandler,
  EnableUserHandler,
  DeleteUserHandler,
  RestoreUserHandler,
  InviteUserHandler,
  AcceptInvitationHandler,
  ForcePasswordResetHandler,
  UpdateProfileHandler,
  UpdatePreferencesHandler,
  UploadAvatarHandler,
];

const QueryHandlers = [
  GetUserHandler,
  ListUsersHandler,
  GetProfileHandler,
  GetSessionsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    UserPolicyService,
    {
      provide: 'IUserRepository',
      useClass: InMemoryUserRepository,
    },
  ],
  exports: [
    UserPolicyService,
    'IUserRepository',
  ],
})
export class UsersModule {}
