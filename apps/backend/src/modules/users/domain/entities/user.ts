import { Email } from '../value-objects/email';
import { DisplayName } from '../value-objects/display-name';
import { UserStatus } from '../value-objects/user-status';
import { UserProfile } from './user-profile';
import { UserPreferences } from './user-preferences';
import { UserSecurity } from './user-security';
import { UserSession } from './user-session';
import { UserAvatar } from './user-avatar';

import { UserCreatedEvent } from '../events/user-created.event';
import { UserUpdatedEvent } from '../events/user-updated.event';
import { UserDisabledEvent } from '../events/user-disabled.event';
import { UserEnabledEvent } from '../events/user-enabled.event';
import { UserDeletedEvent } from '../events/user-deleted.event';
import { UserRestoredEvent } from '../events/user-restored.event';
import { UserInvitedEvent } from '../events/user-invited.event';
import { PasswordResetForcedEvent } from '../events/password-reset-forced.event';

export interface UserProps {
  id: string;
  organizationId: string;
  email: Email;
  displayName: DisplayName;
  status?: UserStatus;
  profile?: UserProfile;
  preferences?: UserPreferences;
  security?: UserSecurity;
  sessions?: UserSession[];
  avatar?: UserAvatar;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class User {
  public readonly id: string;
  public readonly organizationId: string;
  private _email: Email;
  private _displayName: DisplayName;
  private _status: UserStatus;
  private _profile: UserProfile;
  private _preferences: UserPreferences;
  private _security: UserSecurity;
  private _sessions: UserSession[];
  private _avatar: UserAvatar;
  public readonly createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;
  private _domainEvents: any[] = [];

  constructor(props: UserProps) {
    this.id = props.id;
    this.organizationId = props.organizationId;
    this._email = props.email;
    this._displayName = props.displayName;
    this._status = props.status ?? UserStatus.active();
    this._profile = props.profile ?? new UserProfile();
    this._preferences = props.preferences ?? new UserPreferences();
    this._security = props.security ?? new UserSecurity();
    this._sessions = props.sessions ?? [];
    this._avatar = props.avatar ?? new UserAvatar();
    this.createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._deletedAt = props.deletedAt ?? null;
  }

  public get email(): Email { return this._email; }
  public get displayName(): DisplayName { return this._displayName; }
  public get status(): UserStatus { return this._status; }
  public get profile(): UserProfile { return this._profile; }
  public get preferences(): UserPreferences { return this._preferences; }
  public get security(): UserSecurity { return this._security; }
  public get sessions(): readonly UserSession[] { return [...this._sessions]; }
  public get avatar(): UserAvatar { return this._avatar; }
  public get updatedAt(): Date { return this._updatedAt; }
  public get deletedAt(): Date | null { return this._deletedAt; }
  public get domainEvents(): any[] { return [...this._domainEvents]; }

  public clearDomainEvents(): void { this._domainEvents = []; }

  public static create(id: string, organizationId: string, emailStr: string, displayNameStr: string): User {
    const email = new Email(emailStr);
    const displayName = new DisplayName(displayNameStr);
    const user = new User({ id, organizationId, email, displayName });
    user._domainEvents.push(new UserCreatedEvent(user.id, user.organizationId, user.email.getValue()));
    return user;
  }

  public static invite(id: string, organizationId: string, emailStr: string, displayNameStr: string): User {
    const email = new Email(emailStr);
    const displayName = new DisplayName(displayNameStr);
    const user = new User({ id, organizationId, email, displayName, status: UserStatus.invited() });
    user._domainEvents.push(new UserInvitedEvent(user.id, user.organizationId, user.email.getValue()));
    return user;
  }

  public acceptInvitation(newDisplayNameStr?: string): void {
    if (!this._status.isInvited()) {
      throw new Error('User is not in INVITED status');
    }
    if (newDisplayNameStr) {
      this._displayName = new DisplayName(newDisplayNameStr);
    }
    this._status = UserStatus.active();
    this._updatedAt = new Date();
  }

  public updateProfile(props: Parameters<UserProfile['update']>[0]): void {
    this.ensureActive();
    this._profile = this._profile.update(props);
    this._updatedAt = new Date();
    this._domainEvents.push(new UserUpdatedEvent(this.id, this.organizationId));
  }

  public updatePreferences(props: Parameters<UserPreferences['update']>[0]): void {
    this.ensureActive();
    this._preferences = this._preferences.update(props);
    this._updatedAt = new Date();
  }

  public uploadAvatar(storageObjectId: string, thumbnailUrl: string): void {
    this.ensureActive();
    this._avatar = this._avatar.update(storageObjectId, thumbnailUrl);
    this._updatedAt = new Date();
  }

  public disable(): void {
    if (this._status.isDeleted()) throw new Error('Cannot disable deleted user');
    this._status = UserStatus.disabled();
    this._updatedAt = new Date();
    this._domainEvents.push(new UserDisabledEvent(this.id, this.organizationId));
  }

  public enable(): void {
    if (this._status.isDeleted()) throw new Error('Cannot enable deleted user');
    this._status = UserStatus.active();
    this._updatedAt = new Date();
    this._domainEvents.push(new UserEnabledEvent(this.id, this.organizationId));
  }

  public forcePasswordReset(): void {
    this.ensureActive();
    this._domainEvents.push(new PasswordResetForcedEvent(this.id, this.organizationId));
  }

  public delete(): void {
    if (this._status.isDeleted()) throw new Error('User is already deleted');
    this._status = UserStatus.deleted();
    this._deletedAt = new Date();
    this._updatedAt = new Date();
    this._domainEvents.push(new UserDeletedEvent(this.id, this.organizationId, this._deletedAt));
  }

  public restore(): void {
    if (!this._status.isDeleted()) throw new Error('User is not deleted');
    this._status = UserStatus.active();
    this._deletedAt = null;
    this._updatedAt = new Date();
    this._domainEvents.push(new UserRestoredEvent(this.id, this.organizationId));
  }

  public addSession(session: UserSession): void {
    this._sessions.push(session);
  }

  private ensureActive(): void {
    if (this._status.isDeleted()) throw new Error('Operation not allowed on deleted user');
  }
}
