import { ApplicationException } from './application.exception';

export class ForbiddenException extends ApplicationException {
  constructor(message = 'Access forbidden') {
    super(message, 'FORBIDDEN_ERROR');
    this.name = 'ForbiddenException';
  }
}
