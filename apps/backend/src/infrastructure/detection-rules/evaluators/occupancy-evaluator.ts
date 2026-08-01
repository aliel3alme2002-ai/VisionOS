import { Injectable } from '@nestjs/common';
import { IRuleEvaluator } from './rule-evaluator.interface';
import { RuleConfig } from '../models/rule-config';
import { Zone } from '../zone/zone';
import { TrackedObject } from '../../tracking/models/tracked-object';
import { RuleViolation } from '../models/rule-violation';
import { CrowdDensityEvaluator } from './crowd-density-evaluator';

@Injectable()
export class OccupancyEvaluator implements IRuleEvaluator {
  constructor(private readonly crowdEvaluator: CrowdDensityEvaluator) {}

  public evaluate(rule: RuleConfig, zone: Zone, objects: TrackedObject[]): RuleViolation[] {
    return this.crowdEvaluator.evaluate(rule, zone, objects);
  }
}
