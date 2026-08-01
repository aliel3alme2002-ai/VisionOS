export class FrigateConfigurationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FrigateConfigurationException';
  }
}
