import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IUserRepository } from '../../../../modules/users/domain/repositories/user.repository';
import { User } from '../../../../modules/users/domain/entities/user';
import { UserMapper, RawUserRecord } from './user.mapper';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawUserRecord>('user');
  }

  async save(user: User): Promise<void> {
    const data = UserMapper.toPrisma(user);
    await this.delegate.upsert({
      where: { id: user.id },
      create: data,
      update: data,
    });
  }

  async findById(id: string, includeDeleted = false): Promise<User | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    const user = UserMapper.toDomain(raw);
    if (!includeDeleted && user.deletedAt !== null) return null;
    return user;
  }

  async findByEmailAndOrg(email: string, _organizationId: string): Promise<User | null> {
    const raw = await this.delegate.findFirst({ where: { email } });
    if (!raw) return null;
    return UserMapper.toDomain(raw);
  }

  async findByOrgId(_organizationId: string, includeDeleted = false): Promise<User[]> {
    const list = await this.delegate.findMany();
    return list
      .map((r: RawUserRecord) => UserMapper.toDomain(r))
      .filter((u: User) => includeDeleted || u.deletedAt === null);
  }

  async existsByEmailInOrg(email: string, _organizationId: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { email } });
    return count > 0;
  }
}
