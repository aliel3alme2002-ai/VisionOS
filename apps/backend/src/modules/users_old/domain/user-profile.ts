export interface UserProfile {
  readonly userId: string;
  readonly phone: string | null;
  readonly jobTitle: string | null;
  readonly preferences: Record<string, any>;
  readonly notificationSettings: Record<string, boolean>;
}
