export class OnvifDiscoveryException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OnvifDiscoveryException';
  }
}
