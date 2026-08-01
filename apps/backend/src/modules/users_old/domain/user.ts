export interface User {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly displayName: string;
  readonly avatarUrl: string | null;
  readonly language: string;
  readonly timezone: string;
  readonly status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
