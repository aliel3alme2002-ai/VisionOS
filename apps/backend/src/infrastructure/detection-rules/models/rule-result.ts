import { RuleViolation } from './rule-violation';

export interface RuleEvaluationResultProps {
  frameId: string;
  cameraId: string;
  timestamp: number;
  evaluatedRulesCount: number;
  violations: RuleViolation[];
  evaluationTimeMs: number;
}

export class RuleEvaluationResult implements RuleEvaluationResultProps {
  public readonly frameId: string;
  public readonly cameraId: string;
  public readonly timestamp: number;
  public readonly evaluatedRulesCount: number;
  public readonly violations: RuleViolation[];
  public readonly evaluationTimeMs: number;

  constructor(props: RuleEvaluationResultProps) {
    this.frameId = props.frameId;
    this.cameraId = props.cameraId;
    this.timestamp = props.timestamp;
    this.evaluatedRulesCount = props.evaluatedRulesCount;
    this.violations = props.violations;
    this.evaluationTimeMs = props.evaluationTimeMs;
  }
}
