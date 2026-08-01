export interface Invitation {
  readonly id: string;
  readonly organizationId: string;
  readonly email: string;
  readonly invitedBy: string;
  readonly token: string;
  readonly expiresAt: Date;
  readonly status: 'PENDING' | 'ACCEPTED' | 'EXPIRED' | 'REVOKED';
}
