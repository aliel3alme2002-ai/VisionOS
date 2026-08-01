import { ApplicationException } from './application.exception';

export class ConflictException extends ApplicationException {
  constructor(message: string) {
    super(message, 'CONFLICT_ERROR');
    this.name = 'ConflictException';
  }
}
