import { Module, Global } from '@nestjs/common';
import { UserService } from './services/user.service';
import { InvitationService } from './services/invitation.service';
import { UserContextService } from './services/user-context.service';
import { USER_REPOSITORY } from './repositories/user.repository';
import { INVITATION_REPOSITORY } from './repositories/invitation.repository';
import { USER_PROFILE_REPOSITORY } from './repositories/user-profile.repository';

// Removed dummies

@Global()
@Module({
  providers: [
    UserService,
    InvitationService,
    UserContextService,
  ],
  exports: [
    UserService,
    InvitationService,
    UserContextService,
    USER_REPOSITORY,
    INVITATION_REPOSITORY,
    USER_PROFILE_REPOSITORY,
  ],
})
export class UsersModule {}
