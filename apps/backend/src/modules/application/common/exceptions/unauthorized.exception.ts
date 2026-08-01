import { ApplicationException } from './application.exception';

export class UnauthorizedException extends ApplicationException {
  constructor(message = 'Authentication required') {
    super(message, 'UNAUTHORIZED_ERROR');
    this.name = 'UnauthorizedException';
  }
}
