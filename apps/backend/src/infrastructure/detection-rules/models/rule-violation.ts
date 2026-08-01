import { RuleSeverity, RuleType } from './rule-config';

export interface RuleViolationProps {
  violationId: string;
  ruleId: string;
  ruleType: RuleType;
  zoneId: string;
  trackId: string;
  classId: number;
  className: string;
  confidence: number;
  severity: RuleSeverity;
  timestamp: number;
  details: Record<string, unknown>;
}

export class RuleViolation implements RuleViolationProps {
  public readonly violationId: string;
  public readonly ruleId: string;
  public readonly ruleType: RuleType;
  public readonly zoneId: string;
  public readonly trackId: string;
  public readonly classId: number;
  public readonly className: string;
  public readonly confidence: number;
  public readonly severity: RuleSeverity;
  public readonly timestamp: number;
  public readonly details: Record<string, unknown>;

  constructor(props: RuleViolationProps) {
    this.violationId = props.violationId;
    this.ruleId = props.ruleId;
    this.ruleType = props.ruleType;
    this.zoneId = props.zoneId;
    this.trackId = props.trackId;
    this.classId = props.classId;
    this.className = props.className;
    this.confidence = props.confidence;
    this.severity = props.severity;
    this.timestamp = props.timestamp;
    this.details = props.details;
  }
}
