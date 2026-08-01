import { Injectable } from '@nestjs/common';
import { IRuleEvaluator } from './rule-evaluator.interface';
import { RuleConfig } from '../models/rule-config';
import { Zone } from '../zone/zone';
import { TrackedObject } from '../../tracking/models/tracked-object';
import { RuleViolation } from '../models/rule-violation';
import { RayCasting } from '../geometry/ray-casting';
import { Point2D } from '../zone/point';

@Injectable()
export class CrowdDensityEvaluator implements IRuleEvaluator {
  public evaluate(rule: RuleConfig, zone: Zone, objects: TrackedObject[]): RuleViolation[] {
    const violations: RuleViolation[] = [];
    let countInZone = 0;

    for (const obj of objects) {
      const centerPoint = new Point2D(
        obj.boundingBox.xPixel + obj.boundingBox.widthPixel / 2,
        obj.boundingBox.yPixel + obj.boundingBox.heightPixel / 2,
      );

      if (RayCasting.isPointInPolygon(centerPoint, zone.polygon)) {
        countInZone++;
      }
    }

    const limit = rule.capacityLimit ?? zone.maxCapacity ?? 10;
    if (countInZone > limit) {
      violations.push(
        new RuleViolation({
          violationId: `viol-crowd-${Date.now()}`,
          ruleId: rule.ruleId,
          ruleType: 'CROWD_DENSITY',
          zoneId: zone.zoneId,
          trackId: 'MULTIPLE',
          classId: 0,
          className: 'person',
          confidence: 1.0,
          severity: rule.severity,
          timestamp: Date.now(),
          details: {
            currentCount: countInZone,
            capacityLimit: limit,
          },
        }),
      );
    }

    return violations;
  }
}
