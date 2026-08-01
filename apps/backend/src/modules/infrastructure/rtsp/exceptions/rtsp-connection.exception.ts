export class RtspConnectionException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RtspConnectionException';
  }
}
