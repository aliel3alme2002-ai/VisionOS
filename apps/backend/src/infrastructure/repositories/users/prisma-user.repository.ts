import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UserRepository } from '../../../modules/users/repositories/user.repository';
import { User } from '../../../modules/users/domain/user';
import { Email } from '../../../modules/users/domain/value-objects/email';
import { DisplayName } from '../../../modules/users/domain/value-objects/display-name';
import { UserStatus } from '../../../modules/users/domain/value-objects/user-status';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const data = await this.prisma.client.user.findUnique({ where: { id } });
    if (!data) return null;
    return new User({
      id: data.id,
      organizationId: data.organizationId,
      email: new Email(data.email),
      displayName: new DisplayName(data.displayName),
      status: UserStatus.create(data.status),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.prisma.client.user.findUnique({ where: { email } });
    if (!data) return null;
    return new User({
      id: data.id,
      organizationId: data.organizationId,
      email: new Email(data.email),
      displayName: new DisplayName(data.displayName),
      status: UserStatus.create(data.status),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  async create(user: User): Promise<void> {
    await this.prisma.client.user.create({
      data: {
        id: user.id,
        organizationId: 'default-org',
        email: user.email.getValue(),
        firstName: '',
        lastName: '',
        displayName: user.displayName.getValue(),
        passwordHash: '',
        status: user.status.getValue(),
      },
    });
  }

  async update(user: User): Promise<void> {
    await this.prisma.client.user.update({
      where: { id: user.id },
      data: {
        email: user.email.getValue(),
        displayName: user.displayName.getValue(),
        status: user.status.getValue(),
      },
    });
  }
}
