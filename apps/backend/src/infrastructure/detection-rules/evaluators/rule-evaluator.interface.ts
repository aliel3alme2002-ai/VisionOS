import { RuleConfig } from '../models/rule-config';
import { Zone } from '../zone/zone';
import { TrackedObject } from '../../tracking/models/tracked-object';
import { RuleViolation } from '../models/rule-violation';

export interface IRuleEvaluator {
  evaluate(rule: RuleConfig, zone: Zone, objects: TrackedObject[]): RuleViolation[];
}
