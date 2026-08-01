export interface PipelineStageProps {
  name: string;
  type: string; // preprocessing | inference | postprocessing | tracking
  config?: Record<string, unknown>;
}

export class PipelineStage {
  public readonly name: string;
  public readonly type: string;
  public readonly config: Record<string, unknown>;

  constructor(props: PipelineStageProps) {
    this.name = props.name;
    this.type = props.type;
    this.config = props.config ?? {};
  }
}
