export class FrigateConnectionException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FrigateConnectionException';
  }
}
