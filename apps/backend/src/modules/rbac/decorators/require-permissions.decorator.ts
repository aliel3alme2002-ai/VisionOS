import { SetMetadata } from '@nestjs/common';

export const REQUIRE_PERMISSIONS_KEY = 'require_permissions';
export const REQUIRE_ANY_PERMISSION_KEY = 'require_any_permission';
export const REQUIRE_ALL_PERMISSIONS_KEY = 'require_all_permissions';

export const RequirePermissions = (...permissions: string[]) => SetMetadata(REQUIRE_PERMISSIONS_KEY, permissions);
export const RequireAnyPermission = (...permissions: string[]) => SetMetadata(REQUIRE_ANY_PERMISSION_KEY, permissions);
export const RequireAllPermissions = (...permissions: string[]) => SetMetadata(REQUIRE_ALL_PERMISSIONS_KEY, permissions);
