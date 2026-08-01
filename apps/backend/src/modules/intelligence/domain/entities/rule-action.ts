import { RuleActionType } from '../value-objects/rule-action-type';

export interface RuleActionProps {
  type: RuleActionType;
  params?: Record<string, unknown>;
}

export class RuleAction {
  public readonly type: RuleActionType;
  public readonly params: Record<string, unknown>;

  constructor(props: RuleActionProps) {
    this.type = props.type;
    this.params = props.params ?? {};
  }
}
