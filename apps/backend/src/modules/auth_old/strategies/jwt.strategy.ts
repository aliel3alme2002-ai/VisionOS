import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { VisionOSConfig } from '@visionos/config';
import { VISIONOS_CONFIG } from '../../../config/config.constants';
import { Identity } from '../domain/identity';
import { IdentityFactory } from '../domain/identity.factory';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(VISIONOS_CONFIG) config: VisionOSConfig,
    private readonly identityFactory: IdentityFactory,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.auth.jwtSecret,
      issuer: config.auth.jwtIssuer,
      audience: config.auth.jwtAudience,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async validate(payload: any): Promise<Identity> {
    if (payload.type !== 'access') {
      throw new UnauthorizedException('Invalid token type');
    }

    return this.identityFactory.fromJwtPayload(payload);
  }
}
