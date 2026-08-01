import { RuleCondition } from './rule-condition';
import { RuleAction } from './rule-action';

export interface RuleProps {
  id: string;
  organizationId: string;
  name: string;
  enabled?: boolean;
  priority?: number;
  conditions?: RuleCondition[];
  actions?: RuleAction[];
}

export class Rule {
  public readonly id: string;
  public readonly organizationId: string;
  private _name: string;
  private _enabled: boolean;
  public readonly priority: number;
  public readonly conditions: RuleCondition[];
  public readonly actions: RuleAction[];

  constructor(props: RuleProps) {
    this.id = props.id;
    this.organizationId = props.organizationId;
    this._name = props.name;
    this._enabled = props.enabled ?? true;
    this.priority = props.priority ?? 1;
    this.conditions = props.conditions ?? [];
    this.actions = props.actions ?? [];
  }

  public get name(): string { return this._name; }
  public get enabled(): boolean { return this._enabled; }

  public enable(): void { this._enabled = true; }
  public disable(): void { this._enabled = false; }
}
