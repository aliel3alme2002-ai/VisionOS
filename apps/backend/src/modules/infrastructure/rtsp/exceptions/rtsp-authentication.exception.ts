export class RtspAuthenticationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RtspAuthenticationException';
  }
}
