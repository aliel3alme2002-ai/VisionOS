export class CorrelationId {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value && value.trim().length > 0 ? value : CorrelationId.generate();
  }

  public getValue(): string {
    return this.value;
  }

  public static generate(): string {
    return `corr_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}
