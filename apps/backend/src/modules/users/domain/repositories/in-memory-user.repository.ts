import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository';
import { User } from '../entities/user';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private readonly storage = new Map<string, User>();

  async save(user: User): Promise<void> {
    this.storage.set(user.id, user);
  }

  async findById(id: string, includeDeleted = false): Promise<User | null> {
    const user = this.storage.get(id);
    if (!user) return null;
    if (!includeDeleted && user.status.isDeleted()) return null;
    return user;
  }

  async findByEmailAndOrg(email: string, organizationId: string): Promise<User | null> {
    const normalized = email.toLowerCase().trim();
    for (const u of this.storage.values()) {
      if (u.organizationId === organizationId && u.email.getValue() === normalized) {
        return u;
      }
    }
    return null;
  }

  async findByOrgId(organizationId: string, includeDeleted = false): Promise<User[]> {
    const list: User[] = [];
    for (const u of this.storage.values()) {
      if (u.organizationId === organizationId && (includeDeleted || !u.status.isDeleted())) {
        list.push(u);
      }
    }
    return list;
  }

  async existsByEmailInOrg(email: string, organizationId: string): Promise<boolean> {
    const u = await this.findByEmailAndOrg(email, organizationId);
    return u !== null;
  }
}
