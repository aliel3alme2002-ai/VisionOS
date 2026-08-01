import { RuntimeException } from './runtime.exception';

export class InferenceException extends RuntimeException {
  constructor(message: string) {
    super('Inference Error: ' + message);
    this.name = 'InferenceException';
  }
}
