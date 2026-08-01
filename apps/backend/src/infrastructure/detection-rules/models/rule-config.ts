export type RuleType = 'INTRUSION' | 'LOITERING' | 'TRIPWIRE' | 'CROWD_DENSITY' | 'OBJECT_COUNT' | 'WRONG_DIRECTION';
export type RuleSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface RuleConfigProps {
  ruleId: string;
  name: string;
  ruleType: RuleType;
  zoneId: string;
  targetClasses: string[];
  minConfidence: number;
  dwellTimeSeconds?: number | undefined;
  capacityLimit?: number | undefined;
  severity: RuleSeverity;
  enabled: boolean;
}

export class RuleConfig implements RuleConfigProps {
  public readonly ruleId: string;
  public readonly name: string;
  public readonly ruleType: RuleType;
  public readonly zoneId: string;
  public readonly targetClasses: string[];
  public readonly minConfidence: number;
  public readonly dwellTimeSeconds?: number | undefined;
  public readonly capacityLimit?: number | undefined;
  public readonly severity: RuleSeverity;
  public readonly enabled: boolean;

  constructor(props: RuleConfigProps) {
    this.ruleId = props.ruleId;
    this.name = props.name;
    this.ruleType = props.ruleType;
    this.zoneId = props.zoneId;
    this.targetClasses = props.targetClasses;
    this.minConfidence = props.minConfidence;
    this.dwellTimeSeconds = props.dwellTimeSeconds;
    this.capacityLimit = props.capacityLimit;
    this.severity = props.severity;
    this.enabled = props.enabled;
  }
}
