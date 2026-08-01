export interface UserProfileProps {
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  jobTitle?: string | null;
  department?: string | null;
  language?: string;
  timezone?: string;
}

export class UserProfile {
  public readonly firstName: string | null;
  public readonly lastName: string | null;
  public readonly phone: string | null;
  public readonly jobTitle: string | null;
  public readonly department: string | null;
  public readonly language: string;
  public readonly timezone: string;

  constructor(props?: UserProfileProps) {
    this.firstName = props?.firstName ?? null;
    this.lastName = props?.lastName ?? null;
    this.phone = props?.phone ?? null;
    this.jobTitle = props?.jobTitle ?? null;
    this.department = props?.department ?? null;
    this.language = props?.language ?? 'en';
    this.timezone = props?.timezone ?? 'UTC';
  }

  public update(props: Partial<UserProfileProps>): UserProfile {
    return new UserProfile({
      firstName: props.firstName !== undefined ? props.firstName : this.firstName,
      lastName: props.lastName !== undefined ? props.lastName : this.lastName,
      phone: props.phone !== undefined ? props.phone : this.phone,
      jobTitle: props.jobTitle !== undefined ? props.jobTitle : this.jobTitle,
      department: props.department !== undefined ? props.department : this.department,
      language: props.language ?? this.language,
      timezone: props.timezone ?? this.timezone,
    });
  }
}
