export class OrganizationName {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Organization name cannot be empty');
    }
    if (value.length < 2 || value.length > 100) {
      throw new Error('Organization name must be between 2 and 100 characters');
    }
  }

  public getValue(): string {
    return this.value;
  }
}
