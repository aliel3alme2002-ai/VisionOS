export interface UserPreferencesProps {
  theme?: string;
  dashboard?: string;
  notifications?: Record<string, boolean>;
  defaultCameraView?: string | null;
}

export class UserPreferences {
  public readonly theme: string;
  public readonly dashboard: string;
  public readonly notifications: Record<string, boolean>;
  public readonly defaultCameraView: string | null;

  constructor(props?: UserPreferencesProps) {
    this.theme = props?.theme ?? 'dark';
    this.dashboard = props?.dashboard ?? 'default';
    this.notifications = props?.notifications ?? { email: true, push: true, sms: false };
    this.defaultCameraView = props?.defaultCameraView ?? null;
  }

  public update(props: Partial<UserPreferencesProps>): UserPreferences {
    return new UserPreferences({
      theme: props.theme ?? this.theme,
      dashboard: props.dashboard ?? this.dashboard,
      notifications: props.notifications ?? this.notifications,
      defaultCameraView: props.defaultCameraView !== undefined ? props.defaultCameraView : this.defaultCameraView,
    });
  }
}
