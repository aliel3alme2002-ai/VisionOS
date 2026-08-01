import { RuntimeException } from './runtime.exception';

export class RuntimeConnectionException extends RuntimeException {
  constructor(message: string) {
    super('Connection Error: ' + message);
    this.name = 'RuntimeConnectionException';
  }
}
