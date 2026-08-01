import { Injectable } from '@nestjs/common';
import { ZoneManager } from './zone-manager';
import { RuleRegistry } from './rule-registry';
import { IntrusionEvaluator } from '../evaluators/intrusion-evaluator';
import { LoiteringEvaluator } from '../evaluators/loitering-evaluator';
import { TripwireEvaluator } from '../evaluators/tripwire-evaluator';
import { CrowdDensityEvaluator } from '../evaluators/crowd-density-evaluator';
import { OccupancyEvaluator } from '../evaluators/occupancy-evaluator';
import { TrackedObject } from '../../tracking/models/tracked-object';
import { RuleEvaluationResult } from '../models/rule-result';
import { RuleViolation } from '../models/rule-violation';

@Injectable()
export class RuleExecutionEngine {
  constructor(
    private readonly zoneManager: ZoneManager,
    private readonly ruleRegistry: RuleRegistry,
    private readonly intrusionEvaluator: IntrusionEvaluator,
    private readonly loiteringEvaluator: LoiteringEvaluator,
    private readonly tripwireEvaluator: TripwireEvaluator,
    private readonly crowdEvaluator: CrowdDensityEvaluator,
    private readonly occupancyEvaluator: OccupancyEvaluator,
  ) {}

  public evaluateRules(
    frameId: string,
    cameraId: string,
    timestamp: number,
    objects: TrackedObject[],
  ): RuleEvaluationResult {
    const startTime = Date.now();
    const activeRules = this.ruleRegistry.listRules();
    const violations: RuleViolation[] = [];

    for (const rule of activeRules) {
      const zone = this.zoneManager.getZone(rule.zoneId);
      if (!zone) continue;

      let ruleViolations: RuleViolation[] = [];

      switch (rule.ruleType) {
        case 'INTRUSION':
          ruleViolations = this.intrusionEvaluator.evaluate(rule, zone, objects);
          break;
        case 'LOITERING':
          ruleViolations = this.loiteringEvaluator.evaluate(rule, zone, objects);
          break;
        case 'TRIPWIRE':
          ruleViolations = this.tripwireEvaluator.evaluate(rule, zone, objects);
          break;
        case 'CROWD_DENSITY':
          ruleViolations = this.crowdEvaluator.evaluate(rule, zone, objects);
          break;
        case 'OBJECT_COUNT':
        case 'WRONG_DIRECTION':
          ruleViolations = this.occupancyEvaluator.evaluate(rule, zone, objects);
          break;
      }

      violations.push(...ruleViolations);
    }

    const evaluationTimeMs = Date.now() - startTime;

    return new RuleEvaluationResult({
      frameId,
      cameraId,
      timestamp,
      evaluatedRulesCount: activeRules.length,
      violations,
      evaluationTimeMs,
    });
  }
}
