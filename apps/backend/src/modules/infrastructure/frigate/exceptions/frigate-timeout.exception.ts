export class FrigateTimeoutException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FrigateTimeoutException';
  }
}
