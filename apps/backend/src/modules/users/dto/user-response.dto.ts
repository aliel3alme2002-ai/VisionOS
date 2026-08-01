import { User } from '../domain/entities/user';

export class UserResponseDto {
  id!: string;
  organizationId!: string;
  email!: string;
  displayName!: string;
  status!: string;
  profile!: {
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    jobTitle: string | null;
    department: string | null;
    language: string;
    timezone: string;
  };
  preferences!: {
    theme: string;
    dashboard: string;
    notifications: Record<string, boolean>;
    defaultCameraView: string | null;
  };
  security!: {
    mfaEnabled: boolean;
    passwordChangedAt: string | null;
    failedLoginAttempts: number;
    lockedUntil: string | null;
  };
  avatar!: {
    storageObjectId: string | null;
    thumbnailUrl: string | null;
  };
  createdAt!: string;
  updatedAt!: string;
  deletedAt!: string | null;

  public static fromEntity(user: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.organizationId = user.organizationId;
    dto.email = user.email.getValue();
    dto.displayName = user.displayName.getValue();
    dto.status = user.status.getValue();
    dto.profile = {
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      phone: user.profile.phone,
      jobTitle: user.profile.jobTitle,
      department: user.profile.department,
      language: user.profile.language,
      timezone: user.profile.timezone,
    };
    dto.preferences = {
      theme: user.preferences.theme,
      dashboard: user.preferences.dashboard,
      notifications: user.preferences.notifications,
      defaultCameraView: user.preferences.defaultCameraView,
    };
    dto.security = {
      mfaEnabled: user.security.mfaEnabled,
      passwordChangedAt: user.security.passwordChangedAt ? user.security.passwordChangedAt.toISOString() : null,
      failedLoginAttempts: user.security.failedLoginAttempts,
      lockedUntil: user.security.lockedUntil ? user.security.lockedUntil.toISOString() : null,
    };
    dto.avatar = {
      storageObjectId: user.avatar.storageObjectId,
      thumbnailUrl: user.avatar.thumbnailUrl,
    };
    dto.createdAt = user.createdAt.toISOString();
    dto.updatedAt = user.updatedAt.toISOString();
    dto.deletedAt = user.deletedAt ? user.deletedAt.toISOString() : null;
    return dto;
  }
}
