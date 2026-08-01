import { Injectable } from '@nestjs/common';
import { Identity } from './identity';

@Injectable()
export class IdentityFactory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public fromJwtPayload(payload: any): Identity {
    return {
      userId: payload.sub,
      tenantId: payload.tenantId,
      sessionId: payload.sessionId,
      tokenVersion: payload.tokenVersion,
      roles: payload.roles || [],
      permissions: payload.permissions || [],
    };
  }

  // Future support: fromOAuth, fromLdap, etc.
}
