import { User } from '../entities/user';

export interface IUserRepository {
  save(user: User): Promise<void>;
  findById(id: string, includeDeleted?: boolean): Promise<User | null>;
  findByEmailAndOrg(email: string, organizationId: string): Promise<User | null>;
  findByOrgId(organizationId: string, includeDeleted?: boolean): Promise<User[]>;
  existsByEmailInOrg(email: string, organizationId: string): Promise<boolean>;
}
