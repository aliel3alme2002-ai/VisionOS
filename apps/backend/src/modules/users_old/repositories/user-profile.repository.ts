import { UserProfile } from '../domain/user-profile';

export const USER_PROFILE_REPOSITORY = Symbol('USER_PROFILE_REPOSITORY');

export interface UserProfileRepository {
  findByUserId(userId: string): Promise<UserProfile | null>;
  upsert(profile: UserProfile): Promise<void>;
}
