export class ModelDeletedEvent {
  constructor(
    public readonly modelId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
