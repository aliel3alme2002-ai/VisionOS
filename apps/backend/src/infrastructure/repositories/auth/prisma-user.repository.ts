import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from '../../database/base.repository';
import { UserRepository } from '../../../modules/auth/repositories/user.repository';
import { User } from '../../../modules/auth/domain/user';
import { DATABASE_CLIENT } from '../../database/prisma.module';
import { DatabaseClient } from '../../database/database-client.interface';

@Injectable()
export class AuthPrismaUserRepository extends BaseRepository implements UserRepository {
  constructor(@Inject(DATABASE_CLIENT) db: DatabaseClient) {
    super(db);
  }

  public async findById(id: string): Promise<User | null> {
    const record = await this.db.client.user.findUnique({
      where: { id },
    });
    if (!record) return null;
    return this.mapToDomain(record);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const record = await this.db.client.user.findUnique({
      where: { email },
    });
    if (!record) return null;
    return this.mapToDomain(record);
  }

  public async exists(id: string): Promise<boolean> {
    const count = await this.db.client.user.count({
      where: { id },
    });
    return count > 0;
  }

  private mapToDomain(record: any): User {
    return {
      id: record.id,
      email: record.email,
      firstName: record.firstName,
      lastName: record.lastName,
      passwordHash: record.passwordHash,
      status: record.status as any,
      roles: [], // Roles should technically be joined via userRoles but auth domain usually doesn't need them globally, we'll keep empty for now
    };
  }
}
