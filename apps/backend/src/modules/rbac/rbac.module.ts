import { Module, Global } from '@nestjs/common';
import { PermissionResolver } from './services/permission.resolver';
import { AuthorizationService } from './services/authorization.service';
import { RBACGuard } from './guards/rbac.guard';

// Dummy cache for now
const dummyAuthorizationCache = {
  provide: 'AUTHORIZATION_CACHE',
  useValue: {
    get: async () => null,
    set: async () => {},
    invalidate: async () => {},
  },
};

@Global()
@Module({
  providers: [
    PermissionResolver,
    AuthorizationService,
    RBACGuard,
    dummyAuthorizationCache,
  ],
  exports: [
    AuthorizationService,
    RBACGuard,
  ],
})
export class RBACModule {}
