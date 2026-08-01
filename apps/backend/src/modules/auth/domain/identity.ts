export interface Identity {
  readonly userId: string;
  readonly tenantId?: string | undefined;
  readonly sessionId?: string | undefined;
  readonly tokenVersion?: number | undefined;
  readonly roles: string[];
  readonly permissions?: string[] | undefined;
}
