export interface RuleConditionProps {
  type: string; // Zone Enter | Zone Exit | Line Crossing | Loitering | Object Count etc.
  params?: Record<string, unknown>;
}

export class RuleCondition {
  public readonly type: string;
  public readonly params: Record<string, unknown>;

  constructor(props: RuleConditionProps) {
    this.type = props.type;
    this.params = props.params ?? {};
  }
}
