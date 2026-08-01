export class DisplayName {
  private readonly value: string;

  constructor(name: string) {
    if (!name || name.trim().length === 0) {
      throw new Error('Display name cannot be empty');
    }
    if (name.trim().length < 2 || name.trim().length > 100) {
      throw new Error('Display name must be between 2 and 100 characters');
    }
    this.value = name.trim();
  }

  public getValue(): string {
    return this.value;
  }
}
