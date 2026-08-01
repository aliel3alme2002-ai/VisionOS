export class OnvifConnectionException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OnvifConnectionException';
  }
}
