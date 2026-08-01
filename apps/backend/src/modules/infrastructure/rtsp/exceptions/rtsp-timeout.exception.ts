export class RtspTimeoutException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RtspTimeoutException';
  }
}
