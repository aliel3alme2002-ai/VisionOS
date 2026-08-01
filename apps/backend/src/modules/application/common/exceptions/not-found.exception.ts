import { ApplicationException } from './application.exception';

export class NotFoundException extends ApplicationException {
  constructor(resource: string, identifier?: string) {
    const msg = identifier ? `${resource} with identifier '${identifier}' was not found` : `${resource} was not found`;
    super(msg, 'NOT_FOUND_ERROR');
    this.name = 'NotFoundException';
  }
}
