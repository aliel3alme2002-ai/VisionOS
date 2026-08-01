import { Injectable } from '@nestjs/common';
import { IRuleEvaluator } from './rule-evaluator.interface';
import { RuleConfig } from '../models/rule-config';
import { Zone } from '../zone/zone';
import { TrackedObject } from '../../tracking/models/tracked-object';
import { RuleViolation } from '../models/rule-violation';
import { RayCasting } from '../geometry/ray-casting';
import { Point2D } from '../zone/point';

@Injectable()
export class LoiteringEvaluator implements IRuleEvaluator {
  public evaluate(rule: RuleConfig, zone: Zone, objects: TrackedObject[]): RuleViolation[] {
    const violations: RuleViolation[] = [];
    const thresholdSec = rule.dwellTimeSeconds ?? 10;

    for (const obj of objects) {
      if (!rule.targetClasses.includes(obj.className) && !rule.targetClasses.includes('*')) {
        continue;
      }

      const centerPoint = new Point2D(
        obj.boundingBox.xPixel + obj.boundingBox.widthPixel / 2,
        obj.boundingBox.yPixel + obj.boundingBox.heightPixel / 2,
      );

      if (RayCasting.isPointInPolygon(centerPoint, zone.polygon)) {
        const dwellTimeSec = (Date.now() - obj.firstSeen.getTime()) / 1000.0;
        if (dwellTimeSec >= thresholdSec) {
          violations.push(
            new RuleViolation({
              violationId: `viol-loit-${Date.now()}-${obj.trackId}`,
              ruleId: rule.ruleId,
              ruleType: 'LOITERING',
              zoneId: zone.zoneId,
              trackId: obj.trackId,
              classId: obj.classId,
              className: obj.className,
              confidence: obj.confidence,
              severity: rule.severity,
              timestamp: Date.now(),
              details: {
                zoneName: zone.name,
                dwellTimeSec,
                thresholdSec,
              },
            }),
          );
        }
      }
    }

    return violations;
  }
}
