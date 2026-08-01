export class Email {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private readonly value: string;

  constructor(email: string) {
    if (!email || !Email.EMAIL_REGEX.test(email.trim())) {
      throw new Error(`Invalid email address: '${email}'`);
    }
    this.value = email.trim().toLowerCase();
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }
}
