export class TopicBuilder {
  private readonly parts: string[] = [];

  constructor(prefix: string) {
    this.parts.push(prefix);
  }

  public add(part: string): TopicBuilder {
    this.parts.push(part);
    return this;
  }

  public build(): string {
    return this.parts.join('/');
  }
}
