export class InferenceCompletedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly runtimeId: string, public readonly modelVersionId: string, public readonly durationMs: number) {}
}
