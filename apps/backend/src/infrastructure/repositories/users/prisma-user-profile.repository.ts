import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from '../../database/base.repository';
import { UserProfileRepository } from '../../../modules/users/repositories/user-profile.repository';
import { UserProfile } from '../../../modules/users/domain/user-profile';
import { DATABASE_CLIENT } from '../../database/prisma.module';
import { DatabaseClient } from '../../database/database-client.interface';

@Injectable()
export class PrismaUserProfileRepository extends BaseRepository implements UserProfileRepository {
  constructor(@Inject(DATABASE_CLIENT) db: DatabaseClient) {
    super(db);
  }

  public async findByUserId(userId: string): Promise<UserProfile | null> {
    // @ts-ignore: Intentionally unused as model not yet in Prisma schema
    const id = userId;
    return null;
  }

  public async upsert(profile: UserProfile): Promise<void> {
    // @ts-ignore: Intentionally unused
    const p = profile;
  }
}
