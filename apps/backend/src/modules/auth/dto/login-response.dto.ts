export class UserInfoDto {
  id!: string;
  email!: string;
  name!: string;
}

export class OrganizationInfoDto {
  id!: string;
  name!: string;
}

export class LoginResponseDto {
  accessToken!: string;
  refreshToken!: string;
  expiresAt!: Date;
  user!: UserInfoDto;
  organization?: OrganizationInfoDto;
  permissions!: string[];
  roles!: string[];
}
