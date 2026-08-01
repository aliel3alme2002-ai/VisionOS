import { RuntimeException } from './runtime.exception';

export class ModelLoadingException extends RuntimeException {
  constructor(message: string) {
    super('Model Loading Error: ' + message);
    this.name = 'ModelLoadingException';
  }
}
