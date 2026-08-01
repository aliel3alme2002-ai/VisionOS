export class ApplicationException extends Error {
  public readonly code: string;

  constructor(message: string, code = 'APPLICATION_ERROR') {
    super(message);
    this.name = 'ApplicationException';
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
