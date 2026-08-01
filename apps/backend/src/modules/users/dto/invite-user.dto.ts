import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class InviteUserDto {
  @IsString()
  @IsNotEmpty()
  organizationId!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  displayName!: string;
}

export class AcceptInvitationDto {
  @IsString()
  @IsNotEmpty()
  token!: string;

  @IsString()
  @IsOptional()
  displayName?: string;
}
