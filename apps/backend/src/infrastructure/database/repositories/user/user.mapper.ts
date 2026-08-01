import { User } from '../../../../modules/users/domain/entities/user';
import { UserProfile } from '../../../../modules/users/domain/entities/user-profile';
import { UserPreferences } from '../../../../modules/users/domain/entities/user-preferences';
import { UserSecurity } from '../../../../modules/users/domain/entities/user-security';
import { UserAvatar } from '../../../../modules/users/domain/entities/user-avatar';
import { Email } from '../../../../modules/users/domain/value-objects/email';
import { DisplayName } from '../../../../modules/users/domain/value-objects/display-name';
import { UserStatus } from '../../../../modules/users/domain/value-objects/user-status';

export interface RawUserRecord {
  id: string;
  organizationId?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  passwordHash?: string;
  avatarUrl?: string | null | undefined;
  language?: string;
  timezone?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class UserMapper {
  public static toDomain(prismaModel: RawUserRecord): User {
    const profile = new UserProfile({
      firstName: prismaModel.firstName ?? '',
      lastName: prismaModel.lastName ?? '',
    });
    const preferences = new UserPreferences();
    const security = new UserSecurity();
    const avatar = new UserAvatar({
      thumbnailUrl: prismaModel.avatarUrl ?? null,
    });

    const now = new Date();

    return new User({
      id: prismaModel.id,
      organizationId: prismaModel.organizationId ?? 'default-org',
      email: new Email(prismaModel.email),
      displayName: new DisplayName(prismaModel.displayName ?? prismaModel.email),
      status: UserStatus.create(prismaModel.status ?? 'ACTIVE'),
      profile,
      preferences,
      security,
      avatar,
      createdAt: prismaModel.createdAt ?? now,
      updatedAt: prismaModel.updatedAt ?? now,
      deletedAt: prismaModel.deletedAt ?? null,
    });
  }

  public static toPrisma(domain: User): RawUserRecord {
    return {
      id: domain.id,
      organizationId: domain.organizationId,
      email: domain.email.getValue(),
      firstName: domain.profile.firstName ?? '',
      lastName: domain.profile.lastName ?? '',
      displayName: domain.displayName.getValue(),
      avatarUrl: domain.avatar.thumbnailUrl ?? undefined,
      status: domain.status.getValue(),
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
