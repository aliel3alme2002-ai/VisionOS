import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from '../domain/user';
import { UserProfile } from '../domain/user-profile';
import { UserRepository, USER_REPOSITORY } from '../repositories/user.repository';
import { UserProfileRepository, USER_PROFILE_REPOSITORY } from '../repositories/user-profile.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(USER_PROFILE_REPOSITORY) private readonly userProfileRepository: UserProfileRepository,
  ) {}

  public async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async getProfile(userId: string): Promise<UserProfile> {
    let profile = await this.userProfileRepository.findByUserId(userId);
    if (!profile) {
      // Return default profile if none exists
      profile = {
        userId,
        phone: null,
        jobTitle: null,
        preferences: {},
        notificationSettings: {},
      };
    }
    return profile;
  }

  public async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const profile = await this.getProfile(userId);
    const updatedProfile: UserProfile = {
      ...profile,
      ...updates,
      userId, // Ensure userId cannot be overwritten
    };

    await this.userProfileRepository.upsert(updatedProfile);
    return updatedProfile;
  }
}
